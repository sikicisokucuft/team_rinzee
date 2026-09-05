import os
import glob
import re

def process_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. HTML Specifics
    if path.endswith('index.html'):
        content = content.replace('background-color: #fafafa;', 'background-color: #f8fafc;') # slate-50
        content = content.replace('color: #171717;', 'color: #0f172a;') # slate-900
        content = content.replace('color: #0a0a0a;', 'color: #2563eb;') # blue-600 for brand text
        content = content.replace('border-color: #e5e5e5;', 'border-color: #e2e8f0;') # slate-200
        content = content.replace('background: #0a0a0a;', 'background: #2563eb;') # brand bg
        content = content.replace('background: #e5e5e5;', 'background: #f1f5f9;') # scrollbar track
        content = content.replace('background: #a1a1aa;', 'background: #94a3b8;') # scrollbar thumb
        content = content.replace('background: #71717a;', 'background: #64748b;') # scrollbar hover
        
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        return

    # 2. React Components (.tsx)
    replacements = [
        # Base Backgrounds
        ('bg-[#fafafa]', 'bg-slate-50'),
        ('bg-[#ffffff]', 'bg-white'),
        ('bg-[#f4f4f5]', 'bg-slate-100'),
        ('bg-[#e5e5e5]', 'bg-slate-200'),
        
        # Borders
        ('border-[#e5e5e5]', 'border-slate-200'),
        ('border-[#d4d4d8]', 'border-slate-300'),
        ('border-[#a1a1aa]', 'border-slate-400'),
        
        # Text Colors
        ('text-[#0a0a0a]', 'text-slate-900'),
        ('text-[#171717]', 'text-slate-800'),
        ('text-[#52525b]', 'text-slate-500'),
        ('text-[#71717a]', 'text-slate-400'),
        
        # Hover Backgrounds
        ('hover:bg-[#f4f4f5]', 'hover:bg-slate-100'),
        ('hover:bg-[#e5e5e5]', 'hover:bg-slate-200'),
        ('hover:bg-black', 'hover:bg-slate-900'),
        
        # Hover Borders
        ('hover:border-[#d4d4d8]', 'hover:border-slate-300'),
        ('hover:border-[#a1a1aa]', 'hover:border-slate-400'),
        ('hover:border-[#71717a]', 'hover:border-slate-500'),
        
        # Hover Texts
        ('hover:text-[#0a0a0a]', 'hover:text-slate-900'),
        ('hover:text-[#52525b]', 'hover:text-blue-600'), # Make some text hover states blue
    ]

    for old, new in replacements:
        content = content.replace(old, new)
        
    # Introduce Blue and Black specifically to buttons and key elements
    # CTA Button (Make it Blue)
    content = content.replace('bg-[#0a0a0a] text-white hover:bg-slate-900', 'bg-blue-600 text-white hover:bg-blue-700')
    content = content.replace('bg-[#0a0a0a] hover:bg-slate-900 text-white', 'bg-blue-600 hover:bg-blue-700 text-white')
    
    # Secondary Buttons / Modals (Make them Black)
    # The previous script changed bg-[#111] (which was modal bg) to bg-[#ffffff], so modals are white now.
    
    # Let's add blue to icons
    content = content.replace('text-slate-900 shrink-0', 'text-blue-600 shrink-0')
    content = content.replace('text-slate-500 shrink-0', 'text-blue-500 shrink-0')
    
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

tsx_files = glob.glob('**/*.tsx', recursive=True)
for f in tsx_files:
    process_file(f)
    
process_file('index.html')
print("Theme switched to Slate/Blue/Black!")
