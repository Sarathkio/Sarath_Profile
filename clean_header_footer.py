import re
import glob

html_files = glob.glob("*.html")
print(f"Found HTML files: {html_files}")

# Footer pattern
footer_pattern = re.compile(
    r'(?:<!--\s*Footer Section\s*-->\s*)?<footer id="footer".*?</footer>(?:\s*<!--/Footer Section-->)?',
    re.DOTALL | re.IGNORECASE
)

new_footer = """  <!--Footer Section-->
  <footer id="footer" class="footer position-relative light-background">
    <div class="container text-center">
      <div class="footer-info">
        <h3 class="footer-name">Sarathkumar R</h3>
        <p class="footer-role">Software Engineer</p>
      </div>
      
      <div class="footer-connect mt-4">
        <h4 class="footer-connect-title">Connect With Me</h4>
        <div class="social-links justify-content-center d-flex gap-3 mt-3">
          <a href="https://github.com/Sarathkio" class="github" target="_blank"><i class="bi bi-github"></i></a>
          <a href="https://www.linkedin.com/in/sarathkumar9843/" class="linkedin" target="_blank"><i class="bi bi-linkedin"></i></a>
          <a href="https://www.instagram.com/sarath_kio__/" class="instagram" target="_blank"><i class="bi bi-instagram"></i></a>
          <a href="https://x.com/sk_sarath31835?t=gtvmYEIutLMZZjUbIdAEUQ&s=09" class="twitter" target="_blank"><i class="bi bi-twitter-x"></i></a>
          <a href="https://wa.me/9843424536" class="whatsapp" target="_blank"><i class="bi bi-whatsapp"></i></a>
        </div>
      </div>
      
      <div class="footer-copyright mt-4">
        <p>© 2026 Sarathkumar R. All Rights Reserved.</p>
      </div>
    </div>
  </footer>
  <!--/Footer Section-->"""

for file_path in html_files:
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    # 1. Clean header
    header_match = re.search(r'(<header id="header".*?>)(.*?)(</header>)', content, re.DOTALL | re.IGNORECASE)
    if header_match:
        header_start = header_match.group(1)
        header_body = header_match.group(2)
        header_end = header_match.group(3)
        
        # Remove header social links
        header_body_cleaned = re.sub(r'<div class="social-links text-center">.*?</div>', '', header_body, flags=re.DOTALL)
        
        # Replace in content
        content = content.replace(header_match.group(0), header_start + header_body_cleaned + header_end)
    
    # 2. Replace footer
    content = footer_pattern.sub(new_footer, content)
    
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)
        
    print(f"Processed {file_path}")

print("All files processed successfully!")
