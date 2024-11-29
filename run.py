import subprocess
import os

# Define folder paths and commands
commands = [
    ("Backend", "npm run start:nodemon"),
    ("Frontend", "npm run dev"),
    ("MachineLearning", "python load.py"),
]

base_path = os.path.dirname(os.path.abspath(__file__))
print (base_path)


def run_command_in_new_terminal(folder, command):
    folder_path = os.path.join(base_path, folder)
    print(folder_path)
    print(f"Running command in new terminal: cd {folder_path} && {command}")

    subprocess.Popen(
        f'start cmd.exe /K "cd /d {folder_path} && {command}"', shell=True
    )
    


# Run commands in separate terminals
for folder, cmd in commands:
    run_command_in_new_terminal(folder, cmd)
