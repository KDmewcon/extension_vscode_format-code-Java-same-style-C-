# Change Log

## [1.5.0] - 2024-12-19

### ✨ Tính năng mới
- **Tự động format khi gõ `}`**: Extension sẽ tự động format toàn bộ file khi bạn gõ dấu `}` (có thể bật/tắt)
- **Format Selection**: Hỗ trợ format chỉ đoạn code được chọn
- **Cấu hình linh hoạt**: Thêm các settings để tùy chỉnh hành vi

### ⚙️ Cấu hình mới
- `dvt.autoFormatOnCloseBrace`: Bật/tắt tự động format khi gõ `}` (mặc định: true)
- `dvt.indentSize`: Cấu hình số spaces cho indentation (mặc định: 4, phạm vi: 1-8)
- `dvt.allmanBraceStyle`: Bật/tắt Allman brace style (mặc định: true)

### 🔧 Cải tiến kỹ thuật
- Thêm DocumentFormattingEditProvider cho format toàn bộ file
- Thêm DocumentRangeFormattingEditProvider cho format selection
- Thêm OnTypeFormattingEditProvider cho auto-format khi gõ `}`
- Tối ưu hóa code và tách logic thành các class riêng biệt

### 📚 Cập nhật tài liệu
- Cập nhật README.md với hướng dẫn chi tiết về các tính năng mới
- Thêm bảng cấu hình và ví dụ sử dụng
- Thêm hướng dẫn phát triển và build extension

## [1.1.0] - 2024-12-19

### 🔷 DVT Branding
- Added DVT signature to extension name and commands
- Updated to "DVT Java Formatter" with 🔷 icon
- Professional DVT branding throughout

### ✅ Fixed Major Issues
- **FIXED**: Extension no longer removes imports and package statements
- **FIXED**: Only formats code style, doesn't convert Java syntax
- **IMPROVED**: Keeps Java syntax intact (System.out.println, etc.)

### 🎯 Features
- Format Java code with C# Allman brace style
- Preserve all Java imports, packages, and syntax
- Configurable indentation and brace style
- Keyboard shortcut: Ctrl+Shift+Alt+F
- Right-click context menu integration

### 🔧 Technical
- Removed unnecessary conversion logic
- Streamlined formatter to focus on brace style only
- Clean codebase with DVT standards

## [1.0.0] - 2024-12-19

### Initial Release
- Basic Java to C# style formatting
- Allman brace style conversion
- VS Code integration
