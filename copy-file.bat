chcp 65001

git submodule update --init --remote --recursive

if not exist site-beyondxin\src\content mkdir site-beyondxin\src\content
if exist site-beyondxin\src\content\blog (
    rmdir /S /Q site-beyondxin\src\content\blog 2>nul
    if exist site-beyondxin\src\content\blog del /F /Q site-beyondxin\src\content\blog
)
mklink /J site-beyondxin\src\content\blog %~dp0MyNote\Blog

if not exist site-books.beyondxin\src\content mkdir site-books.beyondxin\src\content
if exist site-books.beyondxin\src\content\posts (
    rmdir /S /Q site-books.beyondxin\src\content\posts 2>nul
    if exist site-books.beyondxin\src\content\posts del /F /Q site-books.beyondxin\src\content\posts
)
mklink /J site-books.beyondxin\src\content\posts %~dp0MyNote\读书笔记

if not exist site-notes.beyondxin mkdir site-notes.beyondxin
if not exist site-notes.beyondxin\docs mkdir site-notes.beyondxin\docs

set dirs=.space Qt VTK C++ 编程 系统 我的项目
setlocal enabledelayedexpansion
for %%d in (%dirs%) do (
    if exist site-notes.beyondxin\docs\%%d rmdir /S /Q site-notes.beyondxin\docs\%%d
    xcopy /E /I /Y MyNote\%%d site-notes.beyondxin\docs\%%d
)
endlocal
