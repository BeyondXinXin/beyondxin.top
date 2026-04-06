chcp 65001

cd /d %~dp0
cd /d ./site-notes.beyondxin.top
python script/rebuild_nav.py
python -m zensical build --clean

cd /d %~dp0
cd /d ./site-books.beyondxin.top
nvm use 22
call pnpm build

cd /d %~dp0
cd /d ./site-beyondxin.top
nvm use 22
call pnpm build

cd /d %~dp0
pause
