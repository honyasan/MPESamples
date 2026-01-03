Add-Type -AssemblyName PresentationCore
$fontFamilies = [System.Windows.Media.Fonts]::SystemFontFamilies | Sort-Object { $_.FamilyNames['en-us'] }
Write-Output "font-family list: ('English name' 'Japanese name')"
$fontFamilies | ForEach-Object {
  if ($_.FamilyNames.ContainsKey('en-us') -And $_.FamilyNames.ContainsKey('ja-jp')) {
    Write-Output "'$($_.FamilyNames['en-us'])' '$($_.FamilyNames['ja-jp'])'"
  }
  elseif ($_.FamilyNames.ContainsKey('en-us')) {
    Write-Output "'$($_.FamilyNames['en-us'])'"
  }
}
