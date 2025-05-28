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

### Format toàn bộ file
- Mở file Java
- Nhấn `Ctrl+Shift+Alt+F` hoặc
- Right-click → "🔷 DVT: Format Java with C# Style"

### Format selection
- Chọn đoạn code trong file Java
- Right-click → "🔷 DVT: Format Selection with C# Style"

## ⚙️ Cấu hình

Truy cập settings qua `File > Preferences > Settings` và tìm "DVT Java Formatter":

- `javaToCSharpFormatter.allmanBraceStyle`: Bật Allman brace style (mặc định: true)
- `javaToCSharpFormatter.indentSize`: Số spaces cho indentation (mặc định: 4)

## 📋 Yêu cầu

- Visual Studio Code 1.74.0 trở lên
- Files Java (.java extension)

## 📦 Cài đặt

1. Download file `dvt-java-formatter-1.1.0.vsix`
2. Mở VS Code
3. Nhấn `Ctrl+Shift+P`
4. Gõ "Extensions: Install from VSIX..."
5. Chọn file đã download

## 🔷 Về DVT

DVT cam kết cung cấp các công cụ phát triển chất lượng cao.

## 📄 License

MIT
