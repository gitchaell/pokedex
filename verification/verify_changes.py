from playwright.sync_api import Page, expect, sync_playwright

def test_pokedex_flow(page: Page):
    # 1. Arrange: Go to the app
    page.goto("http://localhost:4200")

    # Wait for grid to load
    page.wait_for_selector("app-pokemon-grid")

    # 2. Act/Assert: Check Pagination controls
    print("Checking Pagination...")
    expect(page.get_by_text("Page 1")).to_be_visible()
    next_btn = page.get_by_text("Next")
    expect(next_btn).to_be_visible()

    # Take screenshot of Page 1
    page.screenshot(path="verification/page1.png")

    # Go to next page
    print("Clicking Next...")
    next_btn.click()
    page.wait_for_timeout(1000) # Wait for animation/load
    expect(page.get_by_text("Page 2")).to_be_visible()
    page.screenshot(path="verification/page2.png")

    # 3. Act: Select a Pokemon (e.g., Weedle, #13, should be on page 2)
    print("Selecting a Pokemon on Page 2...")
    # Target the name in the card in grid
    weedle_card = page.locator("app-pokemon-grid").get_by_text("Weedle", exact=False)
    weedle_card.click()

    # 4. Assert: Detail View
    page.wait_for_selector("app-pokemon-detail")
    print("Detail view loaded.")
    page.wait_for_timeout(1000) # Wait for detail animation

    # Target title in detail
    detail_title = page.locator("app-pokemon-detail").get_by_text("Weedle", exact=False).first
    expect(detail_title).to_be_visible()

    # Check truncated name container (visual check via screenshot)
    page.screenshot(path="verification/detail_weedle.png")

    # 5. Act: Click Next Arrow in Detail
    print("Clicking Next Arrow in Detail...")
    buttons = page.locator("app-pokemon-detail button")
    next_arrow = buttons.nth(1) # 2nd button (Right arrow)
    next_arrow.click()

    page.wait_for_timeout(1000)
    # Should be Kakuna (#14)
    kakuna_title = page.locator("app-pokemon-detail").get_by_text("Kakuna", exact=False).first
    expect(kakuna_title).to_be_visible()
    page.screenshot(path="verification/detail_kakuna.png")

    print("Success!")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 375, "height": 667}) # Mobile viewport
        try:
            test_pokedex_flow(page)
        finally:
            browser.close()
