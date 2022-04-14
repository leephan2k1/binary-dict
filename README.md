# Dự án từ điển triển khai tìm kiếm dựa trên các thao tác "nửa khoảng"

## Trong project này có 2 phiên bản được triển khai theo cấu trúc: 
* Cây tìm kiếm nhị phân
```
git switch binary-search-tree-version
```
* Tìm kiếm nhị phân
```
git switch binary-search-version
```
* Cách build ra ứng dụng để chạy thực tế, thực hiện lệnh trong vị trí gốc của project
```
npx electron-packager ./ BinaryDictionay
```
electron-packager có rất nhiều options build khác các bạn có thể xem thêm ở đây: [electron-packager](https://github.com/electron/electron-packager). Lệnh trên chỉ đơn giản build ra phiên bản hệ điều hành bạn đang sử dụng. Hiện tại mình có build ra 2 bản dành cho Windows 64bit và Linux 64bits. (MacOS X chưa hoạt động được vì mình không sử dụng OS này). Các bạn có download về trực tiếp ở đây:
[Binary-Dictionary](https://github.com/leephan2k1/binary-dict-host)

* Các tính năng đầy đủ và hoàn chỉnh nhất nằm ở phiên bản binary-search. Vì cây nhị phân khởi tạo khá lâu. Có thể gây khó chịu cho người dùng nên mình đã làm lại bản tìm kiếm nhị phân.

## Các giao diện của Binary Dictionary:

### Tìm kiếm từ
![search-word](https://i.imgur.com/hRDKNLg.png)
![search-word-2](https://i.imgur.com/lsg904h.png)
![search-word-3](https://i.imgur.com/INRQbn1.png)
### Danh sách từ
![word-list](https://i.imgur.com/fW87Cfl.png)
### Thêm từ
![add-word](https://i.imgur.com/aUnBxL1.png)
### Từ vừa tra
![recently-word](https://i.imgur.com/0uRUgli.png)
### Từ yêu thích
![love-word](https://i.imgur.com/DLcDFrU.png)
### Thông tin project
![info](https://i.imgur.com/0Iicr7Z.png)