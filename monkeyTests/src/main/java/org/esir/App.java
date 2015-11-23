package org.esir;

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;



import java.net.URL;
import java.util.Random;
import java.util.UUID;

/**
 * Main method for selenium tests
 * args[0] = url of the selenium grid
 * args[1] = url for the game to test
 */
public class App 
{
    public static void main( String[] args ) throws Exception {
        if(args.length < 1) {
            System.exit(-1);
        }
        Keys direction;
        double randValue = Math.random();
        if(randValue < 0.25) direction = Keys.ARROW_LEFT;
        else if(randValue < 0.5) direction = Keys.ARROW_UP;
        else if (randValue < 0.75) direction = Keys.ARROW_RIGHT;
        else direction = Keys.ARROW_DOWN;

        DesiredCapabilities capability = DesiredCapabilities.firefox();
        WebDriver driver = new FirefoxDriver();
        driver.get(args[0]);
        Thread.currentThread().sleep(2000);
        WebElement element = driver.findElement(By.id("nickname"));
        element.sendKeys(UUID.randomUUID().toString() + Keys.RETURN);

        element = driver.findElement(By.id("game-container"));
        for (int i = 0;i < 240;i++) {
            element.sendKeys(direction);
            Thread.currentThread().sleep(125);
        }
    }
}

// java -jar PJUZfa -role node -hub http://172.31.19.221:4444/grid/register
