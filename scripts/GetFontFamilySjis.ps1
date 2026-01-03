Add-Type -AssemblyName PresentationCore
$fontFamilies = [System.Windows.Media.Fonts]::SystemFontFamilies | Sort-Object { $_.FamilyNames['en-us'] }
Write-Output "●フォントファミリ名一覧（'英語名' '日本語名'）"
$fontFamilies | ForEach-Object {
  if ($_.FamilyNames.ContainsKey('ja-jp')) {
    Write-Output "'$($_.FamilyNames['en-us'])' '$($_.FamilyNames['ja-jp'])'"
  }
  else {
    Write-Output "'$($_.FamilyNames['en-us'])'"
  }
}
