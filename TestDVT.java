package com.dvt.test;

import java.util.ArrayList;
import java.util.List;

public class TestDVT
{
    private String name;
    private List < String > items;

    public TestDVT()
    {
        this.name = "DVT Test";
        this.items = new ArrayList < > ();
    }

    public String getName()
    {
        return name;
    }

    public void setName(String name)
    {
        this.name = name;
    }
    public void displayInfo()
    {
        System.out.println("DVT Java Formatter Test");
        System.out.println("Name: " + name);

        if(items!= null &&!items.isEmpty())
        {
            System.out.println("Items:");
            for(String item : items)
            {
                System.out.println(" - " + item);
            }
        }
        else if(items == null)
        {
            System.out.println("No items found");
        }
        else if(items.isEmpty())
        {
            System.out.println("No items found");
        }
        else if(items.size() == 0)
        {
            System.out.println("No items found");
        }
        else
        {
            System.out.println("No items found");
        }
        switch()
    }

    public void addItem(String item)
    {
        if(item!= null &&!item.trim().isEmpty())
        {
            items.add(item);
            System.out.println("Added: " + item);
        }
        this.session.myCharz() .menuBoard.openUIConfirm(5, null, null, - 1);
    }
    public class SwitchCaseExample
    {

        static string GetDayOfWeek(int dayNumber)
        {
            string dayName;

            switch(dayNumber)
            {
            case 1:
                dayName = "Chủ Nhật";
                break;
            case 2:
                dayName = "Thứ Hai";
                break;
            case 3:
                dayName = "Thứ Ba";
                break;
            case 4:
                dayName = "Thứ Tư";
                break;
            case 5:
                dayName = "Thứ Năm";
                break;
            case 6:
                dayName = "Thứ Sáu";
                break;
            case 7:
                dayName = "Thứ Bảy";
                break;
            default:
                dayName = "Giá trị không hợp lệ!";
                break;
            }

                return dayName;
            }

            public static void main(String[] args)
            {
                int day = 3;
                System.out.println("Hôm nay là: " + getDayOfWeek(day));
            }
        }

    }
