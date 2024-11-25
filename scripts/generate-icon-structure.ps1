$rootDir = "..\uxcel-icons\assets" 
$outputFile = "..\uxcel-icons\dist\icon-structure.js"

$distDir = ".\dist"
if (-not (Test-Path $distDir)) {
    New-Item -ItemType Directory -Path $distDir
}

"const iconStructure = {" | Out-File -FilePath $outputFile -Force

Get-ChildItem -Directory "$rootDir" | ForEach-Object {
    $categoryName = $_.Name

    "    '$categoryName': {" | Out-File -FilePath $outputFile -Append

    Get-ChildItem -Directory $_.FullName | ForEach-Object {
        $subfolderName = $_.Name

        $svgFiles = Get-ChildItem -Path $_.FullName -Filter *.svg
        if ($svgFiles.Count -gt 0) {
            "        '$subfolderName': [" | Out-File -FilePath $outputFile -Append

            $svgFiles | ForEach-Object {
                $svgContent = Get-Content -Path $_.FullName -Raw

                $escapedSvgContent = $svgContent -replace '"', '\"' -replace '\n', '\\n'

                $fileNameWithoutExtension = [System.IO.Path]::GetFileNameWithoutExtension($_.Name)

                $escapedFileName = $fileNameWithoutExtension -replace "'", "\'"

                "            {" | Out-File -FilePath $outputFile -Append
                "                name: '$escapedFileName'," | Out-File -FilePath $outputFile -Append
                "                svg: `"$escapedSvgContent`"" | Out-File -FilePath $outputFile -Append
                "            }," | Out-File -FilePath $outputFile -Append
            }

            "        ]," | Out-File -FilePath $outputFile -Append
        }
    }

    "    }," | Out-File -FilePath $outputFile -Append
}

"};" | Out-File -FilePath $outputFile -Append
