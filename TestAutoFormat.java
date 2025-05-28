package com.dvt.test;

import java.util.ArrayList;
import java.util.List;

public class TestAutoFormat {
    private String name;
    private List<String> items;

    public TestAutoFormat() {
        this.name = "DVT Test";
        this.items = new ArrayList<>();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void displayInfo() {
        System.out.println("DVT Java Formatter Test");
        System.out.println("Name: " + name);

        if(items != null && !items.isEmpty()) {
            System.out.println("Items:");
            for(String item : items) {
                System.out.println(" - " + item);
            }
        } else {
            System.out.println("No items found");
        }
    }

    public void addItem(String item) {
        if(item != null && !item.trim().isEmpty()) {
            items.add(item);
            System.out.println("Added: " + item);
        }
    }

    public void switchExample(int dayNumber) {
        String dayName;
        
        switch(dayNumber) {
            case 1:
                dayName = "Chủ Nhật";
                break;
            case 2:
                dayName = "Thứ Hai";
                break;
            case 3:
                dayName = "Thứ Ba";
                break;
            default:
                dayName = "Không xác định";
                break;
        }
        
        System.out.println("Hôm nay là: " + dayName);
    }

    public static void main(String[] args) {
        TestAutoFormat test = new TestAutoFormat();
        test.displayInfo();
        test.addItem("Item 1");
        test.switchExample(2);
    }
}
