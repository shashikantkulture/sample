Add-Type -AssemblyName System.Drawing

$srcPath = "C:\Users\hacke\.gemini\antigravity-ide\brain\64868d73-2498-4af5-865f-4ce979c1f3b1\.user_uploaded\media_1791367116482.png"
$destDir = "C:\Users\hacke\sample\public\images"

$src = [System.Drawing.Bitmap]::FromFile($srcPath)

# Bounding box is minX=335, maxX=731, minY=140, maxY=417 (397 x 278)
# Add small padding of 8px
$pad = 8
$cropX = [Math]::Max(0, 335 - $pad)
$cropY = [Math]::Max(0, 140 - $pad)
$cropW = [Math]::Min($src.Width - $cropX, (731 - 335 + 1) + ($pad * 2))
$cropH = [Math]::Min($src.Height - $cropY, (417 - 140 + 1) + ($pad * 2))

$cropRect = New-Object System.Drawing.Rectangle($cropX, $cropY, $cropW, $cropH)

# Create 3 cropped bitmaps: Gold, Ivory, and Black
$bmpGold = New-Object System.Drawing.Bitmap($cropW, $cropH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$bmpIvory = New-Object System.Drawing.Bitmap($cropW, $cropH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

for ($y = 0; $y -lt $cropH; $y++) {
    for ($x = 0; $x -lt $cropW; $x++) {
        $origP = $src.GetPixel($cropX + $x, $cropY + $y)
        $alpha = $origP.A

        if ($alpha -gt 5) {
            # Gold color: R=223, G=186, B=115 (#dfba73)
            $goldColor = [System.Drawing.Color]::FromArgb($alpha, 223, 186, 115)
            $bmpGold.SetPixel($x, $y, $goldColor)

            # Ivory color: R=247, G=244, B=237 (#f7f4ed)
            $ivoryColor = [System.Drawing.Color]::FromArgb($alpha, 247, 244, 237)
            $bmpIvory.SetPixel($x, $y, $ivoryColor)
        } else {
            $bmpGold.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
            $bmpIvory.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
        }
    }
}

$bmpGold.Save("$destDir\luxignia-logo-gold.png", [System.Drawing.Imaging.ImageFormat]::Png)
$bmpIvory.Save("$destDir\luxignia-logo.png", [System.Drawing.Imaging.ImageFormat]::Png)

$src.Dispose()
$bmpGold.Dispose()
$bmpIvory.Dispose()

Write-Host "Tightly cropped logos successfully generated with perfect alpha transparency!"
Write-Host "Width=$cropW, Height=$cropH"
