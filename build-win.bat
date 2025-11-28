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

pause