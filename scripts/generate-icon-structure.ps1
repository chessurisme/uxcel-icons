# Icon Structure Generator Script
# Generates a JavaScript object mapping icon categories, subcategories, and SVG contents

# Define variables
$RootDir = "..\uxcel-icons\icons"
$OutputFile = "..\uxcel-icons\dist\icon-structure.js"
$DistDir = ".\dist"

# Ensure output directory exists
$OutputDir = Split-Path $OutputFile -Parent
if (-not (Test-Path $OutputDir)) {
    New-Item -ItemType Directory -Path $OutputDir -Force | Out-Null
}

# Create output file with UTF-8 encoding without BOM
$Utf8NoBomEncoding = New-Object System.Text.UTF8Encoding $False

# Function to escape JavaScript string
function Format-JavaScriptString {
    param($InputString)
    $escaped = $InputString -replace '\\', '\\' `
                            -replace '"', '\\"' `
                            -replace '''', "\\'" `
                            -replace '\n', '\\n' `
                            -replace '\r', '\\r'
    return $escaped
}

# Create a StringBuilder to build the output efficiently
$sb = [System.Text.StringBuilder]::new()

# Start the JavaScript object
[void]$sb.Append("const iconStructure = {`n")

# Process categories
Get-ChildItem -Directory $RootDir | ForEach-Object {
    $categoryName = $_.Name
    $escapedCategoryName = Format-JavaScriptString -InputString $categoryName
    [void]$sb.Append("    `"$escapedCategoryName`": {`n")

    # Process subcategories
    Get-ChildItem -Directory $_.FullName | ForEach-Object {
        $subfolderName = $_.Name
        $escapedSubfolderName = Format-JavaScriptString -InputString $subfolderName

        $svgFiles = Get-ChildItem -Path $_.FullName -Filter *.svg
        if ($svgFiles.Count -gt 0) {
            [void]$sb.Append("        `"$escapedSubfolderName`": [`n")

            $svgFiles | ForEach-Object {
                # Read SVG content
                $svgContent = Get-Content -Path $_.FullName -Raw
                $escapedSvgContent = Format-JavaScriptString -InputString $svgContent

                # Escape filename
                $fileNameWithoutExtension = [System.IO.Path]::GetFileNameWithoutExtension($_.Name)
                $escapedFileName = Format-JavaScriptString -InputString $fileNameWithoutExtension

                # Append icon entry
                [void]$sb.Append("            {`n")
                [void]$sb.Append("                `"name`": `"$escapedFileName`",`n")
                [void]$sb.Append("                `"svg`": `"$escapedSvgContent`"`n")
                [void]$sb.Append("            },`n")
            }

            [void]$sb.Append("        ],`n")
        }
    }

    [void]$sb.Append("    },`n")
}

# Close the JavaScript object, removing the trailing comma
[void]$sb.Append("};")

# Write the content to file using .NET methods for better control
[System.IO.File]::WriteAllText($OutputFile, $sb.ToString(), $Utf8NoBomEncoding)

Write-Host "Icon structure generated successfully at $OutputFile" -ForegroundColor Green