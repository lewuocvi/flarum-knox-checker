@echo off
REM Thực hiện các lệnh npm run build

npm run build

REM Đợi một khoảng thời gian để người dùng có thể đọc thông báo
timeout 5

REM Đóng cửa sổ
exit
