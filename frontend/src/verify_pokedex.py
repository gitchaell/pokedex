from playwright.sync_api import sync_playwright
import sys
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Capture console logs
        page.on("console", lambda msg: print(f"Browser Console: {msg.text}"))

        print("Navigating to http://localhost:4200")
        try:
            page.goto("http://localhost:4200", timeout=30000)
            page.wait_for_load_state("networkidle")
        except Exception as e:
            print(f"Navigation failed: {e}")
            return

        print("Checking content...")
        try:
             # Wait for detail to be populated
             page.wait_for_selector("app-pokemon-detail h1, app-pokemon-detail span.text-lg", timeout=5000)

             # Wait for grid items
             page.wait_for_selector("app-pokemon-grid div.group", timeout=10000)

             # Check Type Icon (Asset fix verification)
             grass_icon = page.locator("img[src*='poketype-grass.svg']").first
             if grass_icon.is_visible():
                 print("Grass Type Icon visible!")

             # Take Success Screenshot
             page.screenshot(path="success.png")
             print("Success! Screenshot saved to success.png")

        except Exception as e:
             print(f"Check failed: {e}")
             page.screenshot(path="error.png")

        browser.close()

if __name__ == "__main__":
    run()
