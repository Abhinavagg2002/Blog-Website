import nbformat
import sys

def convert_notebook_to_script(notebook_path, script_path):
    with open(notebook_path, 'r', encoding='utf-8') as notebook_file:
        notebook_content = nbformat.read(notebook_file, as_version=4)

    with open(script_path, 'w', encoding='utf-8') as script_file:
        for cell in notebook_content.cells:
            if cell.cell_type == 'code':
                script_file.write(f'# In[{cell.execution_count}]\n')
                script_file.write(cell.source)
                script_file.write('\n\n')

if __name__ == '__main__':
    if len(sys.argv) != 3:
        print('Usage: python convert_notebook_to_script.py <notebook_path> <script_path>')
        sys.exit(1)

    notebook_path = sys.argv[1]
    script_path = sys.argv[2]

    convert_notebook_to_script('ANPR.ipynb','script.py')
