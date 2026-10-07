Add-Type -AssemblyName System.Drawing

$srcPath = "C:\Users\hacke\.gemini\antigravity-ide\brain\64868d73-2498-4af5-865f-4ce979c1f3b1\.user_uploaded\media_1791367116482.png"
$destDir = "C:\Users\hacke\sample\public\images"

Copy-Item -Path $srcPath -Destination "$destDir\luxignia-logo-raw.png" -Force

$bmp = [System.Drawing.Bitmap]::FromFile($srcPath)
$w = $bmp.Width
$h = $bmp.Height

# We will create two bitmaps: Gold and Ivory
$bmpGold = New-Object System.Drawing.Bitmap($w, $h, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$bmpIvory = New-Object System.Drawing.Bitmap($w, $h, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

$rect = New-Object System.Drawing.Rectangle(0, 0, $w, $h)

$srcData = $bmp.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::ReadOnly, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$goldData = $bmpGold.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::WriteOnly, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$ivoryData = $bmpIvory.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::WriteOnly, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

$byteCount = [Math]::Abs($srcData.Stride) * $h
$srcBytes = New-Object byte[] $byteCount
$goldBytes = New-Object byte[] $byteCount
$ivoryBytes = New-Object byte[] $byteCount

[System.Runtime.InteropServices.Marshal]::Copy($srcData.Scan0, $srcBytes, 0, $byteCount)

# Gold color: R=197, G=160, B=89 (#c5a059)
# Ivory color: R=247, G=244, B=237 (#f7f4ed)
for ($i = 0; $i -lt $byteCount; $i += 4) {
    $b = $srcBytes[$i]
    $g = $srcBytes[$i + 1]
    $r = $srcBytes[$i + 2]
    # In raw image, logo is black (~0,0,0) and background is white (~255,255,255)
    # Luminance 0 (black logo) -> alpha 255 (fully opaque)
    # Luminance 255 (white bg) -> alpha 0 (fully transparent)
    $lum = [int](0.299 * $r + 0.587 * $g + 0.114 * $b)
    $alpha = 255 - $lum
    
    # Threshold curve for crisp anti-aliased transparency
    if ($alpha -lt 15) {
        $alpha = 0
    } elseif ($alpha -gt 240) {
        $alpha = 255
    }

    # Gold
    $goldBytes[$i] = [byte]89     # B
    $goldBytes[$i + 1] = [byte]160 # G
    $goldBytes[$i + 2] = [byte]197 # R
    $goldBytes[$i + 3] = [byte]$alpha # A

    # Ivory
    $ivoryBytes[$i] = [byte]237    # B
    $ivoryBytes[$i + 1] = [byte]244 # G
    $ivoryBytes[$i + 2] = [byte]247 # R
    $ivoryBytes[$i + 3] = [byte]$alpha # A
}

[System.Runtime.InteropServices.Marshal]::Copy($goldBytes, 0, $goldData.Scan0, $byteCount)
[System.Runtime.InteropServices.Marshal]::Copy($ivoryBytes, 0, $ivoryData.Scan0, $byteCount)

$bmp.UnlockBits($srcData)
$bmpGold.UnlockBits($goldData)
$bmpIvory.UnlockBits($ivoryData)

$bmpGold.Save("$destDir\luxignia-logo-gold.png", [System.Drawing.Imaging.ImageFormat]::Png)
$bmpIvory.Save("$destDir\luxignia-logo.png", [System.Drawing.Imaging.ImageFormat]::Png)

$bmp.Dispose()
$bmpGold.Dispose()
$bmpIvory.Dispose()

Write-Host "Processed logos successfully saved to $destDir!"
