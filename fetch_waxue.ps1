$c = Get-Content "D:\vue-vben-admin-main\waxue_main.css" -Raw
$i = $c.IndexOf('.sideBar[data-v-2c47e539]')
Write-Host $c.Substring($i, 900)
Write-Host ""
Write-Host "=========== header/topbar search ==========="
$i2 = $c.IndexOf('.topBar')
Write-Host "topBar at $i2"
if ($i2 -ge 0) { Write-Host $c.Substring($i2, 700) }
Write-Host ""
$i3 = $c.IndexOf('.head[data-v')
Write-Host "head at $i3"
if ($i3 -ge 0) { Write-Host $c.Substring($i3, 700) }
Write-Host ""
# search for header-related classes
foreach ($pat in @('.headerBox', '.container[data-v-99f64d41]', '.contentBox[data-v-99f64d41]')) {
    $i4 = $c.IndexOf($pat)
    Write-Host "=== [$pat] at $i4 ==="
    if ($i4 -ge 0) { Write-Host $c.Substring($i4, 500) }
    Write-Host ""
}
