import glob

def process_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Let's fix specific tailwind strings that were missed
    
    # 1. Primary Buttons: Find bg-slate-900 hover:bg-slate-900 (because hover:bg-black -> hover:bg-slate-900 in previous script)
    # Actually, previous script replaced bg-[#0a0a0a] with bg-slate-900, so we have bg-slate-900 text-white
    content = content.replace('bg-slate-900 hover:bg-slate-900 text-white', 'bg-blue-600 hover:bg-blue-700 text-white')
    content = content.replace('bg-slate-900 text-white hover:bg-slate-900', 'bg-blue-600 text-white hover:bg-blue-700')
    content = content.replace('bg-slate-900 text-white hover:bg-slate-800', 'bg-blue-600 text-white hover:bg-blue-700')
    
    # 2. Main Hero Button
    content = content.replace('bg-slate-900 text-white hover:bg-neutral-200', 'bg-blue-600 text-white hover:bg-blue-700 shadow-[0_10px_30px_rgba(37,99,235,0.3)] hover:shadow-[0_15px_35px_rgba(37,99,235,0.4)]')
    content = content.replace('bg-slate-900 text-slate-800 hover:bg-neutral-200', 'bg-blue-600 text-white hover:bg-blue-700 shadow-md')
    
    # 3. Secondary Button (Video Preview)
    content = content.replace('bg-white hover:bg-slate-100 text-slate-800', 'bg-slate-900 hover:bg-slate-800 text-white')
    
    # 4. Navbar & Footer
    content = content.replace('bg-white/80 backdrop-blur-md border-b border-slate-200', 'bg-white/90 backdrop-blur-lg border-b border-slate-200 shadow-sm')
    
    # 5. Fix icons colors that should be blue
    content = content.replace('text-slate-400 shrink-0', 'text-blue-500 shrink-0')
    content = content.replace('text-slate-500 shrink-0', 'text-blue-500 shrink-0')
    
    # 6. Some text-slate-900 -> text-blue-600 (like in the Hero Highlight)
    
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

for f in glob.glob('**/*.tsx', recursive=True):
    process_file(f)
print("Fixes applied.")
