import os
import glob

def process_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. HTML Specifics
    if path.endswith('index.html'):
        content = content.replace('background-color: #000000;', 'background-color: #fafafa;')
        content = content.replace('color: #ededed;', 'color: #171717;')
        content = content.replace('color: #ffffff;', 'color: #0a0a0a;')
        content = content.replace('border-color: #333333;', 'border-color: #e5e5e5;')
        content = content.replace('background: #ffffff;', 'background: #0a0a0a;')
        content = content.replace('color: #000000;', 'color: #ffffff;')
        content = content.replace('background: #000000;', 'background: #e5e5e5;') # scrollbar track
        content = content.replace('background: #333333;', 'background: #a1a1aa;') # scrollbar thumb
        content = content.replace('background: #444444;', 'background: #71717a;') # scrollbar hover
        content = content.replace('font-weight: 500;', 'font-weight: 600;')
        content = content.replace('font-weight: 600;', 'font-weight: 700;')
        
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        return

    # 2. React Components (.tsx)
    replacements = [
        # Buttons / Badges / Accents (inverting white to black first)
        ('bg-white hover:bg-neutral-200 text-black', 'bg-[#0a0a0a] hover:bg-black text-white'),
        ('bg-white text-black hover:bg-neutral-200', 'bg-[#0a0a0a] text-white hover:bg-black'),
        ('bg-white text-black', 'bg-[#0a0a0a] text-white'),
        ('text-white hover:text-[#a1a1aa]', 'text-[#0a0a0a] hover:text-[#52525b]'),
        ('text-[#a1a1aa] group-hover:text-white', 'text-[#71717a] group-hover:text-[#0a0a0a]'),
        ('text-[#71717a] hover:text-white', 'text-[#71717a] hover:text-[#0a0a0a]'),
        ('hover:text-white', 'hover:text-[#0a0a0a]'),
        ('border-t-white', 'border-t-[#0a0a0a]'),
        
        # Overlays
        ('bg-black/80', 'bg-[#fafafa]/80'),
        ('bg-black/40', 'bg-[#fafafa]/40'),
        ('bg-black/60', 'bg-[#fafafa]/60'),
        ('bg-black/90', 'bg-[#fafafa]/90'),
        ('bg-[#000]/80', 'bg-white/80'),
        ('bg-[#0a0a0a]/90', 'bg-[#fafafa]/90'),
        
        # Backgrounds
        ('bg-[#000]', 'bg-[#ffffff]'),
        ('bg-[#0a0a0a]', 'bg-[#fafafa]'),
        ('bg-[#111]', 'bg-[#ffffff]'),
        ('bg-[#1a1a1a]', 'bg-[#f4f4f5]'),
        ('bg-[#222]', 'bg-[#e5e5e5]'),
        
        # Borders
        ('border-[#222]', 'border-[#e5e5e5]'),
        ('border-[#333]', 'border-[#e5e5e5]'),
        ('border-[#444]', 'border-[#d4d4d8]'),
        ('border-[#555]', 'border-[#d4d4d8]'),
        ('border-[#666]', 'border-[#a1a1aa]'),
        
        # Hover states
        ('hover:bg-[#1a1a1a]', 'hover:bg-[#f4f4f5]'),
        ('hover:bg-[#222]', 'hover:bg-[#e5e5e5]'),
        ('hover:border-[#444]', 'hover:border-[#d4d4d8]'),
        ('hover:border-[#555]', 'hover:border-[#a1a1aa]'),
        ('hover:border-[#666]', 'hover:border-[#71717a]'),
        
        # Text Colors
        ('text-white', 'text-[#0a0a0a]'),
        ('text-[#ededed]', 'text-[#171717]'),
        ('text-[#a1a1aa]', 'text-[#52525b]'),
        
        # Font weights
        ('font-semibold', 'font-bold'),
        ('font-medium', 'font-semibold'),
    ]

    for old, new in replacements:
        content = content.replace(old, new)
        
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

tsx_files = glob.glob('**/*.tsx', recursive=True)
for f in tsx_files:
    process_file(f)
    
process_file('index.html')

print("Theme switched to light!")
