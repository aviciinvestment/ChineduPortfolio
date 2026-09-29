import sys

with open('src/components/HomeView.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# We want to replace the section from {/* Main Headline */} to the end of the <motion.div> wrapper
# This is tricky so we will just find the pieces.
# Move Name Block before Main Headline
name_block = """            {/* Name Block */}
            <motion.div variants={fadeUpVariants} className="flex flex-col items-center lg:items-start gap-1">
              <span className="text-xl md:text-2xl font-black uppercase tracking-[0.3em] text-accent">
                John Chinedu
              </span>
            </motion.div>"""

# We remove Name Block from its current location
content = content.replace(name_block, "<!-- removed name block -->")

main_headline_marker = "{/* Main Headline */}"

new_name_block = """            {/* Name Block */}
            <motion.div variants={fadeUpVariants} className="flex flex-col items-center lg:items-start gap-1 w-full">
              <span className="text-xl md:text-2xl font-black uppercase tracking-[0.3em] text-accent">
                John Chinedu
              </span>
            </motion.div>

"""

content = content.replace(main_headline_marker, new_name_block + main_headline_marker)

# Also fix the bottom row wrapper
content = content.replace('{/* Bottom Row / Stack */}\\n            <div className="flex flex-col items-center lg:items-start gap-6 md:gap-8 w-full mt-2">', '')
content = content.replace('{/* Bottom Row / Stack */}\\r\\n            <div className="flex flex-col items-center lg:items-start gap-6 md:gap-8 w-full mt-2">', '')

# Remove one closing div
content = content.replace('</motion.div>\\n              </motion.div>\\n          </motion.div>', '</motion.div>\\n          </motion.div>')
content = content.replace('</motion.div>\\r\\n              </motion.div>\\r\\n          </motion.div>', '</motion.div>\\r\\n          </motion.div>')

# Fix shadow colors
content = content.replace('drop-shadow-[0_0_20px_rgba(233,151,91,0.55)]', 'drop-shadow-[0_0_20px_rgba(234,88,12,0.55)]')
content = content.replace('shadow-[0_0_80px_rgba(233,151,91,0.4)]', 'shadow-[0_0_80px_rgba(234,88,12,0.4)]')
content = content.replace('hover:shadow-[0_0_100px_rgba(240,145,63,0.55)]', 'hover:shadow-[0_0_100px_rgba(234,88,12,0.55)]')
content = content.replace('<!-- removed name block -->\\n\\n', '')
content = content.replace('<!-- removed name block -->\\r\\n\\r\\n', '')
content = content.replace('<!-- removed name block -->', '')

with open('src/components/HomeView.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
