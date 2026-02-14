chcp 65001

git submodule update --init --recursive
git submodule foreach git fetch origin
git submodule foreach git reset --hard origin/HEAD

if not exist site-beyondxin.top\src\content mkdir site-beyondxin.top\src\content
if exist site-beyondxin.top\src\content\blog rmdir /S /Q site-beyondxin.top\src\content\blog
mklink /D site-beyondxin.top\src\content\blog ..\..\..\MyNote\Blog

if not exist site-books.beyondxin.top\src\content mkdir site-books.beyondxin.top\src\content
if exist site-books.beyondxin.top\src\content\posts rmdir /S /Q site-books.beyondxin.top\src\content\posts
mklink /D site-books.beyondxin.top\src\content\posts ..\..\..\MyNote\读书笔记

if not exist site-notes.beyondxin.top mkdir site-notes.beyondxin.top
if not exist site-notes.beyondxin.top\docs mkdir site-notes.beyondxin.top\docs

set dirs=.space Qt VTK C++ 开源库 编程 数据结构与算法 运维 系统 我的项目
setlocal enabledelayedexpansion
for %%d in (%dirs%) do (
    if exist site-notes.beyondxin.top\docs\%%d rmdir /S /Q site-notes.beyondxin.top\docs\%%d
    xcopy /E /I /Y MyNote\%%d site-notes.beyondxin.top\docs\%%d
)
endlocal