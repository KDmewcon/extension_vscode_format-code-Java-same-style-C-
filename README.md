# Java Formatter Like Style C# DVT-KDMEWCON

## 😅 Tại sao tạo extension này?

Đơn giản là mình **quen với C# rồi** nhưng phải **làm nhiều dự án Java** 😂

Mình thích style format của C# (dấu `{` xuống dòng riêng) hơn style mặc định của Java (dấu `{` cùng dòng). Thế nên tạo extension này để format Java code theo style C# cho dễ nhìn!

## 🎯 Extension này làm gì?

### ✨ Chức năng chính
- **🔄 Tự động format khi gõ `}`**: Gõ xong dấu `}` là code tự động đẹp luôn
- **🎨 Chuyển từ Java style sang C# style**: Dấu `{` xuống dòng riêng như C#
- **✅ Giữ nguyên 100% Java syntax**: Không động vào package, import, method calls
- **⚙️ Tùy chỉnh được**: Bật/tắt auto-format, đổi indent size

### 🤷‍♂️ Tại sao không dùng formatter có sẵn?
- Các formatter khác phức tạp quá, mình chỉ muốn đổi style dấu ngoặc thôi
- Muốn có control hoàn toàn về cách format
- Làm cho vui, học thêm về VS Code extension 😄

## 📋 Ví dụ trước và sau khi format

### ⬅️ Trước khi format (Java K&R Style):
```java
package com.example;
import java.util.List;

public class Example {
    public void method() {
        System.out.println("Hello World");
        if (condition) {
            for (int i = 0; i < 10; i++) {
                System.out.println(i);
            }
        } else {
            System.out.println("Else block");
        }
    }
}
```

### ➡️ Sau khi format (C# Allman Style):
```java
package com.example;
import java.util.List;

public class Example
{
    public void method()
    {
        System.out.println("Hello World");
        if (condition)
        {
            for (int i = 0; i < 10; i++)
            {
                System.out.println(i);
            }
        }
        else
        {
            System.out.println("Else block");
        }
    }
}
```

> **Lưu ý**: Package, import và tất cả Java syntax được giữ nguyên 100%!

## 🚀 Hướng dẫn sử dụng chi tiết

### 🎯 Cách 1: Tự động format khi gõ `}` (Khuyến nghị)
**Đây là tính năng độc đáo của Java Formatter Like Style C# DVT-KDMEWCON!**

1. **Mở file Java** bất kỳ trong VS Code
2. **Gõ code bình thường** theo style Java thông thường
3. **Khi gõ dấu `}`** trên một dòng riêng → Code tự động format ngay lập tức!

**Ví dụ thực tế:**
```java
// Bạn gõ code như thế này:
public class Test {
public void method() {
if(true) {
System.out.println("Hello");
}  // ← Ngay khi gõ dấu } này...
}
}

// Kết quả tự động xuất hiện:
public class Test
{
    public void method()
    {
        if(true)
        {
            System.out.println("Hello");
        }  // ← Code đã được format!
    }
}
```

### ⚡ Cách 2: Format thủ công

#### 📄 Format toàn bộ file:
- **Phím tắt**: `Ctrl+Shift+Alt+F`
- **Hoặc**: Right-click → "Java Formatter Like Style C# DVT-KDMEWCON"
- **Hoặc**: `Ctrl+Shift+P` → Gõ "Java Formatter" → Chọn "Java Formatter Like Style C# DVT-KDMEWCON"

#### 📝 Format đoạn code được chọn:
1. **Bôi đen** đoạn code cần format
2. **Nhấn** `Shift+Alt+F` (VS Code default format selection)
3. **Hoặc**: Right-click → "Format Selection"

### 🔧 Cách 3: Thiết lập format tự động khi save
Thêm vào `settings.json`:
```json
{
    "[java]": {
        "editor.defaultFormatter": "JavaFormatterLikeStyleCDVT-KDMEWCON.dvt-java-formatter",
        "editor.formatOnSave": true
    }
}
```

## ⚙️ Cấu hình chi tiết

### 🎛️ Cách mở Settings

#### Cách 1: Qua VS Code Settings UI (Dễ nhất)
1. **Nhấn** `Ctrl + ,` (Windows/Linux) hoặc `Cmd + ,` (Mac)
2. **Tìm kiếm** "Java Formatter Like Style C# DVT-KDMEWCON"
3. **Điều chỉnh** các setting theo ý muốn

#### Cách 2: Qua settings.json (Cho người dùng nâng cao)
1. **Nhấn** `Ctrl + Shift + P`
2. **Gõ** "Preferences: Open Settings (JSON)"
3. **Thêm** cấu hình vào file:

```json
{
    "dvt.autoFormatOnCloseBrace": true,
    "dvt.indentSize": 4,
    "dvt.allmanBraceStyle": true,
    "[java]": {
        "editor.defaultFormatter": "JavaFormatterLikeStyleCDVT-KDMEWCON.dvt-java-formatter",
        "editor.formatOnSave": true,
        "editor.formatOnType": true
    }
}
```

### 📊 Bảng cấu hình chi tiết

| Setting | Mô tả | Mặc định | Giá trị có thể | Ví dụ |
|---------|-------|----------|----------------|-------|
| `dvt.autoFormatOnCloseBrace` | Tự động format khi gõ dấu `}` | `true` | `true` / `false` | `true` |
| `dvt.indentSize` | Số spaces cho mỗi mức thụt lề | `4` | `1` đến `8` | `4` |
| `dvt.allmanBraceStyle` | Sử dụng C# Allman brace style | `true` | `true` / `false` | `true` |

### 🔧 Các cấu hình mẫu phổ biến

#### ⭐ Cấu hình khuyến nghị (Mặc định):
```json
{
    "dvt.autoFormatOnCloseBrace": true,
    "dvt.indentSize": 4,
    "dvt.allmanBraceStyle": true
}
```

#### 🚀 Cấu hình cho người thích tự động hóa:
```json
{
    "dvt.autoFormatOnCloseBrace": true,
    "dvt.indentSize": 4,
    "dvt.allmanBraceStyle": true,
    "[java]": {
        "editor.defaultFormatter": "JavaFormatterLikeStyleCDVT-KDMEWCON.dvt-java-formatter",
        "editor.formatOnSave": true,
        "editor.formatOnType": true,
        "editor.formatOnPaste": true
    }
}
```

#### 💻 Cấu hình cho team dùng 2 spaces:
```json
{
    "dvt.autoFormatOnCloseBrace": true,
    "dvt.indentSize": 2,
    "dvt.allmanBraceStyle": true
}
```

#### 🎯 Cấu hình chỉ format thủ công:
```json
{
    "dvt.autoFormatOnCloseBrace": false,
    "dvt.indentSize": 4,
    "dvt.allmanBraceStyle": true
}
```

## 📋 Yêu cầu hệ thống

- **VS Code**: Phiên bản 1.74.0 trở lên
- **File type**: Chỉ hoạt động với file Java (`.java`)
- **OS**: Windows, macOS, Linux

## 📦 Hướng dẫn cài đặt

### 🎯 Cách 1: Cài từ VSIX file (Khuyến nghị)
1. **Download** file `dvt-java-formatter-1.6.0.vsix`
2. **Mở VS Code**
3. **Nhấn** `Ctrl+Shift+P` (Windows/Linux) hoặc `Cmd+Shift+P` (Mac)
4. **Gõ** "Extensions: Install from VSIX..."
5. **Chọn** file VSIX đã download
6. **Restart** VS Code để extension hoạt động

### 🌐 Cách 2: Từ VS Code Marketplace (Nếu có)
1. **Mở VS Code**
2. **Nhấn** `Ctrl+Shift+X` để mở Extensions
3. **Tìm kiếm** "Java Formatter Like Style C# DVT-KDMEWCON"
4. **Click** "Install"

### ✅ Kiểm tra cài đặt thành công
1. **Mở** một file `.java` bất kỳ
2. **Right-click** → Bạn sẽ thấy "Java Formatter Like Style C# DVT-KDMEWCON"
3. **Hoặc** gõ dấu `}` trên một dòng riêng → Code sẽ tự động format

## 🛠️ Troubleshooting (Khắc phục sự cố)

### ❌ Extension không hoạt động?
1. **Kiểm tra** file có đuôi `.java` không
2. **Restart** VS Code
3. **Kiểm tra** extension đã được enable trong Extensions panel

### ❌ Không tự động format khi gõ `}`?
1. **Kiểm tra** setting `dvt.autoFormatOnCloseBrace` = `true`
2. **Đảm bảo** dấu `}` là ký tự duy nhất trên dòng đó
3. **Kiểm tra** VS Code settings: `editor.formatOnType` = `true`

### ❌ VS Code hiện "Configure Default Formatter"?
Thêm vào `settings.json`:
```json
{
    "[java]": {
        "editor.defaultFormatter": "JavaFormatterLikeStyleCDVT-KDMEWCON.dvt-java-formatter"
    }
}
```

## 🔧 Dành cho Developer

### Yêu cầu phát triển:
- **Node.js** 16+
- **TypeScript** 4.9+
- **VS Code Extension API** 1.74+

### Build extension:
```bash
# Cài đặt dependencies
npm install

# Compile TypeScript
npm run compile

# Package extension
npx vsce package
```

### Test extension:
```bash
# Mở trong Extension Development Host
F5 trong VS Code
```

## 🤝 Về tác giả

Mình là developer **quen với C#** nhưng phải làm **nhiều dự án Java**. Thấy style format của Java không quen nên tạo extension này để format theo style C# cho dễ nhìn.

### 📞 Liên hệ & Hỗ trợ
- **Issues**: Báo lỗi hoặc đề xuất tính năng (welcome!)
- **Feedback**: Mọi góp ý để cải thiện extension
- **Version**: 1.6.0

### 💡 Fun Facts
- Extension này sinh ra từ "nỗi khổ" của một C# developer phải code Java 😅
- Mục tiêu: Làm cho Java code nhìn "quen mắt" hơn với người quen C#
- Đơn giản, hiệu quả, không phức tạp!

## 📄 License

MIT License - Sử dụng tự do cho mọi mục đích

---

**Java Formatter Like Style C# DVT-KDMEWCON** - *Vì C# developer cũng phải code Java!* 😄✨
