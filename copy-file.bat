chcp 65001

git submodule update --init --remote --recursive

if not exist site-beyondxin.top\src\content mkdir site-beyondxin.top\src\content
if exist site-beyondxin.top\src\content\blog (
    rmdir /S /Q site-beyondxin.top\src\content\blog 2>nul
    if exist site-beyondxin.top\src\content\blog del /F /Q site-beyondxin.top\src\content\blog
)
mklink /J site-beyondxin.top\src\content\blog %~dp0MyNote\Blog

if not exist site-books.beyondxin.top\src\content mkdir site-books.beyondxin.top\src\content
if exist site-books.beyondxin.top\src\content\posts (
    rmdir /S /Q site-books.beyondxin.top\src\content\posts 2>nul
    if exist site-books.beyondxin.top\src\content\posts del /F /Q site-books.beyondxin.top\src\content\posts
)
mklink /J site-books.beyondxin.top\src\content\posts %~dp0MyNote\读书笔记

if not exist site-notes.beyondxin.top mkdir site-notes.beyondxin.top
if not exist site-notes.beyondxin.top\docs mkdir site-notes.beyondxin.top\docs

set dirs=.space Qt VTK C++ 编程 系统 我的项目
setlocal enabledelayedexpansion
for %%d in (%dirs%) do (
    if exist site-notes.beyondxin.top\docs\%%d rmdir /S /Q site-notes.beyondxin.top\docs\%%d
    xcopy /E /I /Y MyNote\%%d site-notes.beyondxin.top\docs\%%d
)
endlocal
