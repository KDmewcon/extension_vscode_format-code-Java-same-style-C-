public class StringProtectionTest {
    public void test() {
        // Test strings should NOT be modified
        String test1 = "This has + + inside";
        String test2 = "Don't change = = this";
        String test3 = "Keep > > as is";
        String test4 = "Comments / / stay";
        String test5 = "Negative - 5 numbers";
        
        // Test character literals
        char plus = '+';
        char minus = '-';
        char equal = '=';
        
        // Test escaped strings
        String escaped = "Quote \" and + + operators";
        String path = "C:\\folder\\file + +.txt";
        
        // But operators OUTSIDE strings should be fixed
        i + +;
        value = = 1;
        size > > 8;
        x % = 10;
        
        // Mixed case
        System.out.println("String with + + inside");
        i + +; // This should be fixed
        String another = "Another + + string";
    }
}
