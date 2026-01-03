-- local debug_log_to_file = true
local log_file = 'mpee.log'

local convert_list = false
local remove_div_classes = {}

------ debug tools from ------
local space = ' '
local suffix = ':'..space
local indent = '  '
local cr = '\n'

local function log_text(...)
  local t = {}
  for i, v in ipairs({...}) do
    t[i] = tostring(v)
  end
  local text = table.concat(t)
  return text
end

local function log_write(...)
  local text = log_text(...)

  local f = io.open(log_file, 'ab')
  f:write(text, '\n')
  f:close()
end

function logger(...)
  -- 変数なし - 何も表示しない, true - ファイル出力 false - 画面表示
  if (type(debug_log_to_file) == 'boolean') then
    if (debug_log_to_file == true) then
      log_write(...)
    else
      print(...)
    end
  end
end

local dump_indent = '  '
local indent_work = ''

local function obj_check(obj)
  local i_count = 0
  local inline_count = 0
  for key, value in ipairs(obj) do
    local pandoc_type = pandoc.utils.type(value)
    if pandoc_type == 'Inline' then inline_count = inline_count + 1 end
    if tonumber(key) ~= nil then
      i_count = i_count + 1
    end
  end

  local tag_name = ''
  local has_space = false
  local is_inline_list = false
  local last_key = ''
  local key_count = 0
  for key, value in pairs(obj) do
    if key == 'tag' then tag_name = value end
    if key == 'tag' and value == 'Space' then has_space = true end
    key_count = key_count + 1
    last_key = key
  end

  return {
    t = obj.t,
    key_count = key_count,
    tag_name = tag_name,
    has_space = has_space,
    is_inline_list = pandoc.utils.type(obj) == 'Inlines' and i_count == inline_count,
    is_list = pandoc.utils.type(obj) == 'List',
    is_map_array = obj_type ~= 'table' and i_count < key_count,
    last_key = last_key
  }
end

local function dump_primitive(obj)
  if not obj then
    return 'nil object'..cr
  end

  local obj_type = type(obj)
  if obj_type == 'userdata' then
    local pandoc_type = pandoc.utils.type(obj)

    local result = obj_check(obj)
    if pandoc_type == 'Inline' then
      local stringify = ''
      if result.has_space then
        stringify = '" "'
      else
        stringify = pandoc.utils.stringify(obj)
      end
      return pandoc_type..suffix..stringify..cr
    elseif pandoc_type == 'AttributeList' or result.key_count == 0 then
      return pandoc_type..'['..result.key_count..']'..cr
    end

    -- Block, Attr
    local obj_string = ''
    indent_work = indent_work..dump_indent
    for key, value in pairs(obj) do
      if key ~= 'tag' then
        obj_string = obj_string..dump_obj(value, key)
      end
    end
    indent_work = string.sub(indent_work, #dump_indent + 1)

    local obj_t = ''
    if obj.t ~= nil then obj_t = obj.t end

    if result.is_map_array then
      return obj_t..' @ map array["'..result.key_count..'"]'..suffix..cr..obj_string
    else
      return pandoc_type..'['..result.key_count..']'..suffix..cr..obj_string
    end
  elseif obj_type == 'boolean' then
    return tostring(obj)..cr
  elseif obj_type == 'string' then
    return "'"..obj.."'"..cr
  elseif obj_type == 'number' then
    return tostring(obj)..cr
  elseif obj_type == 'table' then
    local result = obj_check(obj)
    local pandoc_type = pandoc.utils.type(obj)
    if result.is_inline_list then
      return obj_type..suffix..pandoc.utils.stringify(obj)..cr
    else
      local obj_string = ''
      indent_work = indent_work..dump_indent
      for key, value in pairs(obj) do
        local value_string = dump_obj(value, key)
        obj_string = obj_string..value_string
      end
      indent_work = string.sub(indent_work, #dump_indent + 1)

      if result.is_list then
        obj_string = pandoc.utils.type(obj)..'['..result.key_count..']'..suffix..cr..obj_string
      elseif result.is_map_array then
        obj_string = 'map array'..'["'..result.key_count..'"]'..suffix..cr..obj_string
      else
        obj_string = type(obj)..'['..result.key_count..']'..suffix..cr..obj_string
      end
      return obj_string
    end
  elseif obj_type == 'function' then
    -- return tostring(obj)..cr
    return '' -- hide pass / obj_type..cr
  else
    return 'unknown obj type '..obj_type..cr
  end
end

function dump_obj(obj, name)
  if name == nil then
    name = obj.t
  end

  local dumped_string = dump_primitive(obj)
  if dumped_string == '' then
    return ''
  else
    return indent_work..name..' - '..dumped_string
  end
end
------ debug tools end ------

local function unwrap_string(raw)
  -- ' " を除去
  return raw:match("^['\"](.*)['\"]$") or raw
end

local function split_and_trim(raw)
  -- []があれば内側をカンマで分割しつつ、各要素の前後空白と ' " を除去
  local out = {}
  local inner = raw:match("^%s*%[(.*)%]%s*$") or raw
  for part in inner:gmatch("([^,]+)") do
    local s = part:match("^%s*(.-)%s*$") or part
    s = unwrap_string(s)
    table.insert(out, s)
  end
  print('out length ',tostring(out))
  return out
end

local function arg_value(meta_arg, initial_value)
  logger('arg_value receive ' .. type(meta_arg))
  if type(meta_arg) == 'number' then
    return meta_arg
  elseif type(meta_arg) == 'string' then
    -- できるだけ変換して返す
    local testValue = tonumber(meta_arg)
    if type(testValue) == 'number' then
      return testValue
    end
    return initial_value
  elseif type(meta_arg) == 'table' then
    if #meta_arg == 1 then
      return arg_value(meta_arg[1], initial_value)
    else
      -- 要素が複数ある配列のときはそのまま返す
      return meta_arg
    end
  elseif type(meta_arg) == 'userdata' then
    local string = pandoc.utils.stringify(meta_arg)
    return tonumber(string)
  else
    logger('Unsupported argument passing.' .. type(meta_arg))
    return initial_value
  end
end

local function arg_bool(meta_arg, initial_value)
  logger('arg_bool receive ' .. type(meta_arg))
  if type(meta_arg) == 'boolean' then
    return meta_arg
  elseif type(meta_arg) == 'table' then
    if #meta_arg == 1 then
      return arg_bool(meta_arg[1], initial_value)
    else
      -- 要素が複数ある配列のときはそのまま返す
      return meta_arg
    end
  elseif type(meta_arg) == 'userdata' or type(meta_arg) == 'string' then
    local string = pandoc.utils.stringify(meta_arg)
    return string == 'true'
  else
    logger('Unsupported argument passing.' .. type(meta_arg))
    return initial_value
  end
end

local function arg_string(meta_arg, initial_value)
  logger('arg_string receive ' .. type(meta_arg))
  if type(meta_arg) == 'string' then
    -- return meta_arg
    return unwrap_string(meta_arg)
  elseif type(meta_arg) == 'table' then
    if #meta_arg == 1 then
      return arg_string(meta_arg[1], initial_value)
    else
      -- 要素が複数ある配列のときはそのまま返す
      return meta_arg
    end
  elseif type(meta_arg) == 'userdata' then
    local string = pandoc.utils.stringify(meta_arg)
    return string
  else
    logger('Unsupported argument passing.' .. type(meta_arg))
    return initial_value
  end
end

local function arg_table(meta_arg, initial_value)
  logger('arg_table receive ' .. type(meta_arg))
  if type(meta_arg) == 'table' then
    for i, value in ipairs(meta_arg) do
      meta_arg[i] = unwrap_string(value)
    end
    return meta_arg
  elseif type(meta_arg) == 'string' then
    return { unwrap_string(meta_arg) }
  else
    logger('Unsupported argument passing.' .. type(meta_arg))
    return initial_value
  end
end

local function arg(meta_arg, initial_value)
  logger('arg receive ' .. type(meta_arg))
  local obj_type = type(meta_arg)
  if obj_type == 'table' then
    return arg_table(meta_arg, initial_value)
  elseif obj_type == 'string' then
    return arg_string(meta_arg, initial_value)
  elseif obj_type == 'boolean' then
    return arg_bool(meta_arg, initial_value)
  elseif obj_type == 'number' then
    return arg_value(meta_arg, initial_value)
  else
    logger('Unsupported argument passing.'..obj_type)
    return initial_value
  end
end

function Meta(meta)
  --[[
    少なくとも３種類の経路で入ってくる動作オプションを読み込む
      - pattern 1 commandline option -> string main & bool
      - pattern 2 YAML commandline option -> quoted string main & bool
      - pattern 3 YAML top level -> table main & bool
  ]]
  -- pandoc.log.warn('head_from is not number.')

--logger('Meta')
--logger(dump_obj(meta, 'meta'))


  if meta.convert_list_to_div then
    logger('test = '..tostring(meta.convert_list_to_div))
    convert_list = arg_bool(meta.convert_list_to_div, convert_list)
  end

  if meta.remove_div_class_name then
    remove_div_classes = arg_table(meta.remove_div_class_name, remove_div_classes)
  end

  logger('Working with the following settings:')
  logger('convert_list_to_div = '..tostring(convert_list))
  for i, value in ipairs(remove_div_classes) do
    logger('remove_div_class_name['..i.. '] '..value)
  end
  logger('')

  return meta
end

local function kanji_numerals(number, type, delimiter)
  local kanji_decimal_table = {
      [1] = "一", [2] = "二", [3] = "三", [4] = "四", [5] = "五",
      [6] = "六", [7] = "七", [8] = "八", [9] = "九", [10] = "〇"
  }
  local kanji_number_table = {
      [1] = "一", [2] = "二", [3] = "三", [4] = "四", [5] = "五",
      [6] = "六", [7] = "七", [8] = "八", [9] = "九", [10] = "零"
  }
  local kanji_digits_table = {
      [1] = "一", [2] = "十", [3] = "百", [4] = "千", [5] = "万"
  }
  local number_string = '';
  local s = tostring(number)

  if #s > #kanji_digits_table then
    return 'out of range'
  end

  if type == 'cjkdecimal' then
    local digit_jump = false
    local digit = #s
    for number_char in string.gmatch(s, '.') do
      local number = tonumber(number_char)
      if number == 0 then number = 10 end

      local unit_char = kanji_digits_table[digit]
      local digit_char = kanji_number_table[number]
      if digit > 1 then
        if number >= 2 and number <= 9 then
          number_string = number_string..digit_char
        end
        if number ~= 10 or digit == #s then
          number_string = number_string..unit_char
        end
      end
      if digit == 1 and number <= 9 then
        number_string = number_string..digit_char
      end

      digit = digit - 1
    end
  else
    local digit = #s
    for number_char in string.gmatch(s, '.') do
      local number = tonumber(number_char)
      if number == 0 then number = 10 end

      local digit_char = kanji_decimal_table[number]
      number_string = number_string..digit_char

      digit = digit - 1
    end
  end

  number_string = number_string..delimiter

  return number_string
end

local list_filter = {
  BulletList = function(elem)
    --logger('walk BulletList')
    --logger(dump_obj(elem, 'list_filter.BulletList.elem'))
    if not convert_list then return elem end

    local new_blocks = {}
    for _, sub_item in ipairs(elem.content) do
      for _, block in ipairs(sub_item) do
        if block.t == 'Plain' then
          block = pandoc.Div(block)
          block.classes:insert("list-item")
        end

        table.insert(new_blocks, block)
      end
    end

    local divided_item = pandoc.Div(new_blocks)
    divided_item.classes:insert("unordered-list")
    --logger(dump_obj(divided_item, 'list_filter.OrderedList.divided_item'))
    return divided_item
  end,

  OrderedList = function(elem)
    --logger('walk OrderedList')
    --logger(dump_obj(elem, 'list_filter.OrderedList.elem'))
    if not convert_list then return elem end

    local style = 'Decimal';
    local delimiter = '、';

    -- 呼び出されたOrderedListの階層でアイテムをdivで囲んで返す
    local new_blocks = {}
    local item_count = elem.listAttributes.start;
    for _, sub_item in ipairs(elem.content) do
      for _, block in ipairs(sub_item) do
        if block.t == 'Plain' then
          local text_content = pandoc.utils.stringify(block)
          local order = kanji_numerals(item_count, style, delimiter)
          local new_text = order..text_content
          item_count = item_count + 1
             -- 元のリストアイテムの内容ごとにdivで囲む
          block = pandoc.Div({pandoc.Str(new_text)})
          block.classes:insert("ordered-list-item")
        end

        table.insert(new_blocks, block)
      end
    end

    local divided_item = pandoc.Div(new_blocks)
    divided_item.classes:insert("ordered-list")
    --logger(dump_obj(divided_item, 'list_filter.OrderedList.divided_item'))
    return divided_item
  end,

  Div = function(elem)
    if elem.attr and elem.attr.classes then
      for _, class in ipairs(elem.attr.classes) do
        for _, remove_class in ipairs(remove_div_classes) do
          if class == remove_class then
            -- 対象のクラス名をもつDivは空のリストを返却することで除去する
            logger('remove Div.'..class)
            return {}
          end
        end
      end
    end

    -- 対象のクラス名をもたないDivは残す
    return elem
  end
}

function Pandoc(doc)
  --logger('Pandoc')
  --logger(dump_obj(doc, 'doc'))
  --logger(dump_obj(doc.blocks, 'doc.blocks'))
  --logger(dump_obj(doc.meta, 'doc.meta'))

  doc = doc:walk(list_filter)
--os.exit(1)
  return  doc
end

return {
  -- single-tableではなくlist-of-tablesで実行順を変更
  {Meta = Meta},
  {Pandoc = Pandoc}
}
