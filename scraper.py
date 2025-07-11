import requests
import os
from typing import List, Dict
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

# URLs base das imagens
IMAGES = {
    'frontal': 'd67f9a6d5ed5443a8481f6950fcf3e03_9366/Camisa_Mexico_Gold_Preto_JF2639_HM31.jpg',
    'alternativa': '412a2a5d352f4776b7c9aa4161d1bcf7_9366/Camisa_Mexico_Gold_Preto_JF2639_HM1.jpg',
    'hover': 'f2445a8c83a44293b37c3d508c356332_9366/Camisa_Mexico_Gold_Preto_JF2639_HM3_hover.jpg',
    'traseira': '30ae727818e848889046a16d4688c73b_9366/Camisa_Mexico_Gold_Preto_JF2639_HM4.jpg',
    'detalhe': '74856b105a034a058e6472639905f6c5_9366/Camisa_Mexico_Gold_Preto_JF2639_HM5.jpg'
}

# Tamanhos disponíveis
SIZES = ['320', '420', '600', '640', '840']

def create_url(image_path: str, size: str) -> str:
    """Cria a URL completa para uma imagem com um tamanho específico."""
    return f"https://assets.adidas.com/images/h_{size},f_auto,q_auto,fl_lossy,c_fill,g_auto/{image_path}"

def download_image(url: str, filename: str) -> None:
    """Faz o download de uma imagem e salva no disco."""
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        
        with open(filename, 'wb') as f:
            f.write(response.content)
        print(f"✅ Download concluído: {filename}")
    
    except requests.RequestException as e:
        print(f"❌ Erro ao baixar {filename}: {str(e)}")

def main():
    # Cria o diretório para salvar as imagens se não existir
    output_dir = Path("images")
    output_dir.mkdir(exist_ok=True)
    
    # Lista para armazenar todas as tarefas de download
    download_tasks = []
    
    # Prepara todas as tarefas de download
    for name, image_path in IMAGES.items():
        for size in SIZES:
            url = create_url(image_path, size)
            filename = output_dir / f"{name}_{size}.jpg"
            download_tasks.append((url, str(filename)))
    
    # Usa ThreadPoolExecutor para fazer downloads em paralelo
    print("Iniciando downloads...")
    with ThreadPoolExecutor(max_workers=5) as executor:
        for url, filename in download_tasks:
            executor.submit(download_image, url, filename)
    
    print("\nProcesso finalizado! 🎉")
    print(f"As imagens foram salvas no diretório: {output_dir.absolute()}")

if __name__ == "__main__":
    main() 