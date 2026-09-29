import sys
import re

with open('src/components/HomeView.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

print("Original length:", len(content))

# 1. Remove the Name Block entirely using regex
name_block_pattern = re.compile(r'\s*\{\/\* Name Block \*\/\}\s*<motion\.div variants=\{fadeUpVariants\} className="flex flex-col items-center lg:items-start gap-1">\s*<span className="text-xl md:text-2xl font-black uppercase tracking-\[0\.3em\] text-accent\">\s*John Chinedu\s*<\/span>\s*<\/motion\.div>')
content, num = name_block_pattern.subn('', content)
print("Removed name block:", num)

# 2. Add Name block before Main Headline
main_headline_marker = "{/* Main Headline */}"
new_name_block = """{/* Name Block */}
            <motion.div variants={fadeUpVariants} className="flex flex-col items-center lg:items-start gap-1 w-full">
              <span className="text-xl md:text-2xl font-black uppercase tracking-[0.3em] text-accent">
                John Chinedu
              </span>
            </motion.div>

            """

content = content.replace(main_headline_marker, new_name_block + main_headline_marker)
print("Replaced main headline marker.")

# 3. Remove bottom row stack wrapper (we have to carefully remove the opening div and matching closing div)
# We can just use regex to remove the wrapper
wrapper_pattern = re.compile(r'\{\/\* Bottom Row \/ Stack \*\/\}\s*<div className="flex flex-col items-center lg:items-start gap-6 md:gap-8 w-full mt-2">\s*')
content, num = wrapper_pattern.subn('', content)
print("Removed bottom row wrapper:", num)

# 4. Remove the extra closing div since we removed the wrapper
closing_pattern = re.compile(r'<\/motion\.div>\s*<\/motion\.div>\s*<\/motion\.div>')
content, num = closing_pattern.subn('</motion.div>\n          </motion.div>', content)
print("Fixed closing divs:", num)

with open('src/components/HomeView.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Final length:", len(content))
