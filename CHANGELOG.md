# Change Log

## [1.9.0] - 2024-12-19

### 🛡️ Critical Fix - String Literal Protection
- **FIXED**: Nội dung trong string literals (`"..."`) và character literals (`'...'`) không bị sửa đổi
- **FIXED**: `"This has + + inside"` giữ nguyên không đổi thành `"This has ++ inside"`
- **FIXED**: `"Don't change = = this"` giữ nguyên không đổi thành `"Don't change == this"`
- **FIXED**: Escaped strings `"Quote \" and + + operators"` được xử lý đúng
- **FIXED**: File paths `"C:\\folder\\file + +.txt"` không bị thay đổi

### 🔧 Technical Implementation
- **Added**: String literal extraction và protection mechanism
- **Added**: Character literal protection
- **Added**: Escaped character handling trong strings
- **Improved**: Operator fixing chỉ áp dụng cho code, không áp dụng cho string content

### ✅ Validation
- Operators bên ngoài strings vẫn được fix đúng
- Operators bên trong strings được bảo vệ hoàn toàn
- Mixed cases (code + strings) hoạt động chính xác

## [1.8.0] - 2024-12-19

### 🐛 Major Bug Fixes - Triệt để fix tất cả operator issues
- **FIXED**: `curR % = key.length` → `curR %= key.length` (compound modulo operator)
- **FIXED**: `size > > 8` → `size >> 8` (shift right operator)
- **FIXED**: `value < < 2` → `value << 2` (shift left operator)
- **FIXED**: `0);/ /` → `0);//` (comment operator)
- **FIXED**: `(JSONArray) JSONValue` → `(JSONArray)JSONValue` (cast operator spacing)
- **FIXED**: `i ++` → `i++` (increment operator - final fix)

### ✨ New Operator Support
- **Added**: All compound assignment operators: `%=`, `&=`, `|=`, `^=`
- **Added**: Shift operators: `>>`, `<<`, `>>>`
- **Added**: Cast operator spacing fix
- **Added**: Comment operator `//` fix

### 🔧 Technical Improvements
- Comprehensive regex patterns for all Java operators
- Better handling of edge cases with/without word characters
- Improved operator precedence in processing order

## [1.7.0] - 2024-12-19

### 🐛 Bug Fixes
- **FIXED**: Operator spacing issues - `i++` không còn bị format thành `i + +`
- **FIXED**: Comparison operators - `==` không còn bị format thành `= = 1`
- **FIXED**: Increment/Decrement - `++` và `--` giữ nguyên không có space
- **FIXED**: Logical operators - `!=` không còn bị format thành `! = d`

### 🔧 Technical Improvements
- Cải thiện regex logic để xử lý multi-character operators trước
- Thêm negative lookahead để tránh conflict giữa các operators
- Tối ưu hóa thứ tự xử lý: `++`, `--`, `==`, `!=` trước, sau đó `+`, `-`, `=`, `!`

### 📝 Documentation
- Cập nhật README với tone thân thiện, thực tế
- Thêm phần "Tại sao tạo extension này?" - câu chuyện C# developer phải code Java 😄
- Bỏ các từ "chuyên nghiệp", "thương hiệu" cho đơn giản

## [1.6.0] - 2024-12-19

### ✨ Tính năng mới
- **🎨 Custom Icon**: Thêm avatar_about_me_.png làm icon chính thức cho extension
- **🏷️ Rebranding**: Đổi tên thành "Java Formatter Like Style C# DVT-KDMEWCON"
- **📝 Complete Documentation**: Viết lại hoàn toàn README với hướng dẫn chi tiết

### 🔧 Cải tiến kỹ thuật
- **Publisher Update**: Cập nhật publisher ID thành "JavaFormatterLikeStyleCDVT-KDMEWCON"
- **Command Updates**: Cập nhật tất cả command titles với tên mới
- **Settings Integration**: Cải thiện integration với VS Code settings

## [1.6.0] - 2024-12-19

### ✨ Tính năng mới
- **🎨 Custom Icon**: Thêm avatar_about_me_.png làm icon chính thức cho extension
- **🏷️ Rebranding**: Đổi tên thành "Java Formatter Like Style C# DVT-KDMEWCON"
- **📝 Complete Documentation**: Viết lại hoàn toàn README với hướng dẫn chi tiết

### 🔧 Cải tiến kỹ thuật
- **Publisher Update**: Cập nhật publisher ID thành "JavaFormatterLikeStyleCDVT-KDMEWCON"
- **Command Updates**: Cập nhật tất cả command titles với tên mới
- **Settings Integration**: Cải thiện integration với VS Code settings

### 📚 Cập nhật tài liệu
- **Detailed Settings Guide**: Thêm hướng dẫn cấu hình chi tiết với 4 template mẫu
- **Troubleshooting Section**: Thêm section khắc phục sự cố
- **Installation Guide**: Hướng dẫn cài đặt step-by-step
- **Usage Examples**: Ví dụ sử dụng thực tế với code samples

### ✅ Bug Fixes
- **Default Formatter Issue**: Khắc phục hoàn toàn vấn đề "Configure Default Formatter"
- **Publisher ID Mismatch**: Sửa lỗi publisher ID không khớp khi publish

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
