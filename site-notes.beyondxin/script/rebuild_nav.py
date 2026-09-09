import os
import sqlite3

db_name = '.space/context.mdb'
base_directory = './docs/'
ignore_directory = ["模板", "Blog", "读书笔记"]
mkdocs_template_path = './mkdocs.template.yml'
mkdocs_path = './mkdocs.yml'


def get_context_bt_db(path):
    db_path = path + db_name
    if not os.path.exists(db_path):
        return []
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute("SELECT File FROM files")
    file_list = [row[0] for row in cursor.fetchall()]
    conn.close()
    return file_list


def get_page_title(file_key):
    file_path = base_directory + file_key
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            for line in f:
                line = line.strip()
                if line.startswith('# '):
                    return line[2:].strip()
    except Exception:
        pass
    return os.path.splitext(os.path.basename(file_key))[0]


def get_page_tree(relative_path=""):
    page_tree = []
    order_tree = get_context_bt_db(base_directory + relative_path)

    for key in order_tree:
        if key in ignore_directory:
            break
        if key.endswith('.md'):
            file_path = base_directory + key
            if relative_path not in file_path:
                continue
            if os.path.exists(file_path):
                page_tree.append(key)
        else:
            subtree = get_page_tree(key+"/")
            if subtree:
                page_tree.append({key.split('/')[-1]: subtree})
    return page_tree


def format_nav_tree(tree, indent=1):
    lines = []
    indent_str = "  " * indent

    for item in tree:
        if isinstance(item, str):
            title = get_page_title(item)
            lines.append(f'{indent_str}- {title}: {item}')
        elif isinstance(item, dict):
            for key, value in item.items():
                lines.append(f'{indent_str}- {key}:')
                lines.extend(format_nav_tree(value, indent + 1))

    return lines


nav_tree = get_page_tree()
print(f"{nav_tree}")

nav_lines = ["nav:"]
nav_lines.extend(format_nav_tree(nav_tree))
new_nav_block = "\n".join(nav_lines)

with open(mkdocs_template_path, 'r', encoding='utf-8') as f:
    content = f.read()

marker = '# 导航版块'
idx = content.find(marker)
if idx == -1:
    print("未找到 '# 导航版块' 标记，请检查模板文件")
    exit(1)

new_content = content[:idx + len(marker)] + '\n' + new_nav_block + '\n'

with open(mkdocs_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print(f"导航已更新到 {mkdocs_path}")
