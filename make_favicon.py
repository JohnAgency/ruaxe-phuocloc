from pathlib import Path
from PIL import Image

source = Path('/home/ubuntu/upload/597768018_4254072161580632_4978955990573161182_n.jpg')
out_dir = Path('/home/ubuntu/work_ruaxe/client/public')
out_dir.mkdir(parents=True, exist_ok=True)

image = Image.open(source).convert('RGB')
image.thumbnail((512, 512), Image.Resampling.LANCZOS)
canvas = Image.new('RGB', (512, 512), '#ffe15b')
left = (512 - image.width) // 2
top = (512 - image.height) // 2
canvas.paste(image, (left, top))
canvas.save(out_dir / 'favicon.png', format='PNG', optimize=True)
canvas.resize((32, 32), Image.Resampling.LANCZOS).save(out_dir / 'favicon.ico', format='ICO', sizes=[(16, 16), (32, 32)])
