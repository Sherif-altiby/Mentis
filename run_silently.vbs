Set WshShell = CreateObject("WScript.Shell")

' Function to check and terminate a process
Sub KillProcess(processName)
    On Error Resume Next
    Set objWMIService = GetObject("winmgmts:\\.\root\cimv2")
    Set colProcesses = objWMIService.ExecQuery("SELECT * FROM Win32_Process WHERE Name = '" & processName & "'")

    For Each objProcess in colProcesses
        objProcess.Terminate()
    Next
    On Error GoTo 0
End Sub

' Kill existing XAMPP Control and MySQL processes if running
KillProcess("xampp-control.exe")
KillProcess("mysqld.exe")

' Start XAMPP Control
WshShell.Run """C:\xampp\xampp-control.exe""", 0, False

' Start MySQL
WshShell.Run """C:\xampp\mysql\bin\mysqld.exe""", 0, False

' Start React
WshShell.Run "cmd.exe /c cd /d """ & WScript.Arguments(0) & """ && npm run dev", 0, False

' Start Laravel
WshShell.Run "cmd.exe /c cd /d """ & WScript.Arguments(1) & """ && php artisan serve", 0, False
