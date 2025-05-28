# 🔷 DVT Java Formatter - Hướng dẫn sử dụng chi tiết

## 🚀 Tính năng chính

### 1. ✨ Tự động format khi gõ `}` (Tính năng mới!)

**Cách hoạt động:**
- Khi bạn gõ dấu `}` và đó là ký tự duy nhất trên dòng đó
- Extension sẽ tự động format toàn bộ file Java
- Chuyển từ K&R style sang Allman style (C# style)

**Ví dụ thực tế:**
```java
// Trước khi gõ } (K&R style)
public class Test {
    public void method() {
        if(condition) {
            System.out.println("Hello");
        // Khi bạn gõ } ở đây ↓
```

```java
// Sau khi gõ } (Allman style - tự động)
public class Test
{
    public void method()
    {
        if(condition)
        {
            System.out.println("Hello");
        }
    }
}
```

### 2. 🎯 Format toàn bộ file

**Cách 1: Phím tắt**
- `Ctrl+Shift+Alt+F`

**Cách 2: Command Palette**
- `Ctrl+Shift+P` → Gõ "DVT" → Chọn "🔷 DVT: Format Java with C# Style"

**Cách 3: Right-click menu**
- Right-click trong file Java → "🔷 DVT: Format Java with C# Style"

### 3. 📝 Format selection (đoạn code được chọn)

**Cách 1: Phím tắt VS Code**
- Chọn đoạn code → `Shift+Alt+F`

**Cách 2: Right-click**
- Chọn đoạn code → Right-click → "Format Selection"

## ⚙️ Cấu hình chi tiết

### Truy cập Settings:
1. `Ctrl+,` → Tìm "DVT Java Formatter"
2. Hoặc `File > Preferences > Settings` → Tìm "DVT"

### Các tùy chọn:

#### `dvt.autoFormatOnCloseBrace`
- **Mô tả**: Tự động format khi gõ dấu `}`
- **Mặc định**: `true`
- **Giá trị**: `true` (bật) / `false` (tắt)

#### `dvt.indentSize`
- **Mô tả**: Số spaces cho mỗi mức indentation
- **Mặc định**: `4`
- **Phạm vi**: `1-8`

#### `dvt.allmanBraceStyle`
- **Mô tả**: Sử dụng Allman brace style (dấu ngoặc nhọn trên dòng riêng)
- **Mặc định**: `true`
- **Giá trị**: `true` (Allman) / `false` (K&R)

### Ví dụ cấu hình trong settings.json:

```json
{
    // Bật tự động format khi gõ }
    "dvt.autoFormatOnCloseBrace": true,
    
    // Sử dụng 2 spaces thay vì 4
    "dvt.indentSize": 2,
    
    // Sử dụng Allman style
    "dvt.allmanBraceStyle": true
}
```

```json
{
    // Tắt tự động format, chỉ format thủ công
    "dvt.autoFormatOnCloseBrace": false,
    
    // Sử dụng 8 spaces
    "dvt.indentSize": 8,
    
    // Vẫn dùng Allman style
    "dvt.allmanBraceStyle": true
}
```

## 🎯 Các trường hợp sử dụng

### Trường hợp 1: Làm việc với code mới
1. Viết code Java bình thường với K&R style
2. Khi gõ `}` cuối method/class → Tự động format
3. Tiếp tục code → Lặp lại

### Trường hợp 2: Format code cũ
1. Mở file Java cũ
2. `Ctrl+Shift+Alt+F` → Format toàn bộ file
3. Hoặc chọn đoạn code → `Shift+Alt+F`

### Trường hợp 3: Tắt auto-format khi cần
1. `Ctrl+,` → Tìm "DVT"
2. Tắt "Auto Format On Close Brace"
3. Chỉ format thủ công khi cần

## 🔧 Troubleshooting

### Tự động format không hoạt động?
1. Kiểm tra setting `dvt.autoFormatOnCloseBrace` = `true`
2. Đảm bảo `}` là ký tự duy nhất trên dòng đó
3. Đảm bảo file có extension `.java`

### Format không đúng ý muốn?
1. Kiểm tra setting `dvt.indentSize`
2. Kiểm tra setting `dvt.allmanBraceStyle`
3. Thử format lại với `Ctrl+Shift+Alt+F`

### Extension không hoạt động?
1. Kiểm tra extension đã được enable
2. Restart VS Code
3. Kiểm tra file có extension `.java`

## 📋 Tips & Tricks

### Tip 1: Sử dụng với Git
- Format code trước khi commit để đồng nhất style trong team

### Tip 2: Kết hợp với VS Code Format
- DVT Formatter chỉ format brace style
- Vẫn có thể dùng VS Code format khác cho spacing, etc.

### Tip 3: Tùy chỉnh theo team
- Thống nhất settings trong team
- Chia sẻ file `.vscode/settings.json`

## 🔷 Hỗ trợ

Nếu gặp vấn đề, vui lòng:
1. Kiểm tra CHANGELOG.md để xem các thay đổi mới nhất
2. Thử restart VS Code
3. Kiểm tra console (F12) để xem lỗi
