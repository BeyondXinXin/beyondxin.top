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

set dirs=.space Qt Vtk C++ 编程 数据结构与算法 运维 系统 我的项目
setlocal enabledelayedexpansion
for %%d in (%dirs%) do (
    if exist site-notes.beyondxin.top\docs\%%d rmdir /S /Q site-notes.beyondxin.top\docs\%%d
    xcopy /E /I /Y MyNote\%%d site-notes.beyondxin.top\docs\%%d
)
endlocal

cd /d %~dp0
cd /d ./site-notes.beyondxin.top
python script/rebuild_nav.py
python -m zensical build --clean
if exist ..\out\notes.beyondxin.top rmdir /S /Q ..\out\notes.beyondxin.top
xcopy /E /I /Y .\site ..\out\notes.beyondxin.top

cd /d %~dp0
cd /d ./site-books.beyondxin.top
nvm use 22
call pnpm build
if exist ..\out\books.beyondxin.top rmdir /S /Q ..\out\books.beyondxin.top
xcopy /E /I /Y .\dist ..\out\books.beyondxin.top

cd /d %~dp0
cd /d ./site-beyondxin.top
nvm use 20
call pnpm build
if exist ..\out\beyondxin.top rmdir /S /Q ..\out\beyondxin.top
xcopy /E /I /Y .\dist ..\out\beyondxin.top

cd /d %~dp0
pause