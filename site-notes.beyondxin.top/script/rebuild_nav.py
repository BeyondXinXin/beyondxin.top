import os
import sqlite3
import re

db_name = '.space/context.mdb'
base_directory = './docs/'
ignore_directory = ["模板", "Blog", "读书笔记"]
toml_path = './zensical.toml'


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
    """将导航树格式化为 TOML 字符串"""
    lines = []
    indent_str = "    " * indent

    for item in tree:
        if isinstance(item, str):
            lines.append(f'{indent_str}"{item}",')
        elif isinstance(item, dict):
            for key, value in item.items():
                lines.append(f'{indent_str}{{ "{key}" = [')
                lines.extend(format_nav_tree(value, indent + 1))
                lines.append(f'{indent_str}] }},')

    return lines


# 生成导航树
nav_tree = get_page_tree()


# 格式化为 TOML 字符串
nav_lines = ["nav = ["]
nav_lines.extend(format_nav_tree(nav_tree))
nav_lines.append("]")
new_nav_content = "\n".join(nav_lines)

# 读取原文件
with open(toml_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 使用正则表达式替换 nav 部分
# 匹配从 nav = [ 到对应的 ] 结束
pattern = r'nav = \[.*?\n\]'
new_content = re.sub(pattern, new_nav_content, content, flags=re.DOTALL)

# 写回文件
with open(toml_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print(f"导航已更新到 {toml_path}")
