@echo off

:: Get the directory of the current batch file
set BATCH_FILE_DIR=%~dp0
set SHORTCUT_PATH=%USERPROFILE%\Desktop\YourAppShortcut.lnk
set ICON_PATH=%BATCH_FILE_DIR%vite.ico  :: Ensure this is the ICO file

:: Create a shortcut using PowerShell
powershell "$s=(New-Object -COM WScript.Shell).CreateShortcut('%SHORTCUT_PATH%'); $s.TargetPath='%~f0'; $s.IconLocation='%ICON_PATH%'; $s.Save()"

:: Add the batch file's directory to the system path
setx PATH "%PATH%;%BATCH_FILE_DIR%"
setx PATH "%PATH%;%BATCH_FILE_DIR%"

:: Check if XAMPP is already running
tasklist /FI "IMAGENAME eq xampp-control.exe" | find /I "xampp-control.exe" >nul
if %ERRORLEVEL%==0 (
    echo XAMPP is already running.
) else (
    echo Starting XAMPP Control...
)

:: Check if MySQL is already running
tasklist /FI "IMAGENAME eq mysqld.exe" | find /I "mysqld.exe" >nul
if %ERRORLEVEL%==0 (
    echo MySQL is already running.
) else (
    echo Starting MySQL...
)

:: Call VBScript to start services without showing terminal
start /min wscript.exe "%BATCH_FILE_DIR%run_silently.vbs" "%BATCH_FILE_DIR%frontend" "%BATCH_FILE_DIR%backend/platform"

:: Open Chrome to the specific website
start chrome.exe http://localhost:5173/

exit
