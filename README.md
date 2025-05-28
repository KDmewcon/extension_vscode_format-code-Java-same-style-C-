# 🔷 DVT Java Formatter

Extension VS Code của DVT để format code Java với style C# mà vẫn giữ nguyên syntax Java.

## ✨ Tính năng

### 🔷 DVT Signature
- **Thương hiệu DVT**: Extension chuyên nghiệp với logo DVT
- **Chất lượng cao**: Được phát triển bởi đội ngũ DVT

### 🔄 Format Brace Style (Chỉ format, không convert)
- **Java (K&R Style)**: Dấu ngoặc nhọn mở cùng dòng
- **C# (Allman Style)**: Dấu ngoặc nhọn mở trên dòng riêng
- **✅ Giữ nguyên Java syntax**: package, import, System.out.println

**Trước:**
```java
package com.example;
import java.util.List;

public class Example {
    public void method() {
        System.out.println("Hello");
        if (condition) {
            // code
        }
    }
}
```

**Sau:**
```java
package com.example;
import java.util.List;

public class Example
{
    public void method()
    {
        System.out.println("Hello");
        if (condition)
        {
            // code
        }
    }
}
```

## 🚀 Cách sử dụng

### 1. Format toàn bộ file
- **Phím tắt**: `Ctrl+Shift+Alt+F`
- **Menu**: Right-click → "🔷 DVT: Format Java with C# Style"
- **Command Palette**: `Ctrl+Shift+P` → "🔷 DVT: Format Java with C# Style"

### 2. Format selection (đoạn code được chọn)
- Chọn đoạn code trong file Java
- **Phím tắt**: `Shift+Alt+F` (VS Code default format selection)
- **Menu**: Right-click → "Format Selection"

### 3. ✨ Tự động format khi gõ `}`
- **Tính năng mới**: Tự động format code khi bạn gõ dấu `}`
- **Điều kiện**: Dấu `}` phải là ký tự duy nhất trên dòng đó
- **Cấu hình**: Có thể bật/tắt trong settings (mặc định: bật)

**Ví dụ tự động format:**
```java
// Khi bạn gõ:
public class Test {
public void method() {
if(true) {
System.out.println("Hello");
}  // ← Khi gõ } ở đây, toàn bộ file sẽ được format tự động
}
}

// Kết quả sau khi gõ }:
public class Test
{
    public void method()
    {
        if(true)
        {
            System.out.println("Hello");
        }
    }
}
```

## ⚙️ Cấu hình

Truy cập settings qua `File > Preferences > Settings` và tìm "DVT Java Formatter":

### Cách cấu hình:
1. **Qua VS Code Settings UI**:
   - `Ctrl+,` → Tìm "DVT Java Formatter"
   - Hoặc `File > Preferences > Settings` → Tìm "DVT"

2. **Qua settings.json**:
```json
{
    "dvt.autoFormatOnCloseBrace": true,
    "dvt.indentSize": 4,
    "dvt.allmanBraceStyle": true
}
```

### Các tùy chọn:

| Setting | Mô tả | Mặc định | Giá trị |
|---------|-------|----------|---------|
| `dvt.autoFormatOnCloseBrace` | Tự động format khi gõ `}` | `true` | `true/false` |
| `dvt.indentSize` | Số spaces cho mỗi mức indentation | `4` | `1-8` |
| `dvt.allmanBraceStyle` | Sử dụng Allman brace style | `true` | `true/false` |

### Ví dụ cấu hình:
```json
// Tắt auto-format, dùng 2 spaces
{
    "dvt.autoFormatOnCloseBrace": false,
    "dvt.indentSize": 2,
    "dvt.allmanBraceStyle": true
}
```

## 📋 Yêu cầu

- Visual Studio Code 1.74.0 trở lên
- Files Java (.java extension)

## 📦 Cài đặt

### Cách 1: Từ VSIX file
1. Download file `dvt-java-formatter-1.4.5.vsix`
2. Mở VS Code
3. Nhấn `Ctrl+Shift+P`
4. Gõ "Extensions: Install from VSIX..."
5. Chọn file đã download

### Cách 2: Từ VS Code Marketplace
1. Mở VS Code
2. Nhấn `Ctrl+Shift+X` (Extensions)
3. Tìm "DVT Java Formatter"
4. Click "Install"

## 🔧 Phát triển và Build

### Yêu cầu:
- Node.js 16+
- TypeScript

### Build extension:
```bash
npm install
npm run compile
```

### Package extension:
```bash
npm install -g vsce
vsce package
```

## 🔷 Về DVT

DVT cam kết cung cấp các công cụ phát triển chất lượng cao.

## 📄 License

MIT
