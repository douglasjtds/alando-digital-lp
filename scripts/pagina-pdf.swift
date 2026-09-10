/**
 * Renderiza UMA página de um PDF para PNG, com o PDFKit do macOS.
 *
 * Existe só para o `processar-fotos.mjs`, que o chama para as entradas `.pdf` da
 * tabela `FOTOS`: o `sharp` que vem com o Next não lê PDF. O PNG sai num
 * diretório temporário, e quem recorta, reduz e grava o JPEG sem metadado é o
 * `sharp`. O porquê está no bloco "A entrada PDF" do `processar-fotos.mjs`.
 *
 * Uso:
 *   swift scripts/pagina-pdf.swift <arquivo.pdf> <página, a partir de 1> <escala> <saida.png>
 *
 * ⚠️ macOS apenas, pelo mesmo motivo do `sips` que decodifica os HEIC: o script é
 * ferramenta de mão, não passo de build.
 *
 * O PNG sai em sRGB e opaco (fundo branco antes de desenhar a página), que é o
 * que o `sharp` espera de uma foto: sem alfa, nada é achatado em preto no JPEG.
 */
import AppKit
import ImageIO
import PDFKit

func falhar(_ mensagem: String, codigo: Int32 = 1) -> Never {
  FileHandle.standardError.write("pagina-pdf: \(mensagem)\n".data(using: .utf8)!)
  exit(codigo)
}

let args = CommandLine.arguments
guard args.count == 5, let numero = Int(args[2]), let escala = Double(args[3]), escala > 0 else {
  falhar("uso: swift pagina-pdf.swift <arquivo.pdf> <pagina> <escala> <saida.png>", codigo: 2)
}

guard let documento = PDFDocument(url: URL(fileURLWithPath: args[1])) else {
  falhar("não consegui abrir \(args[1])")
}
guard numero >= 1, numero <= documento.pageCount, let pagina = documento.page(at: numero - 1) else {
  falhar("página \(numero) fora do documento, que tem \(documento.pageCount)")
}

let caixa = pagina.bounds(for: .mediaBox)
let largura = Int((caixa.width * escala).rounded())
let altura = Int((caixa.height * escala).rounded())

guard
  let espaco = CGColorSpace(name: CGColorSpace.sRGB),
  let contexto = CGContext(
    data: nil, width: largura, height: altura, bitsPerComponent: 8, bytesPerRow: 0,
    space: espaco, bitmapInfo: CGImageAlphaInfo.noneSkipLast.rawValue)
else {
  falhar("não consegui criar o bitmap de \(largura)×\(altura)")
}

contexto.setFillColor(CGColor(red: 1, green: 1, blue: 1, alpha: 1))
contexto.fill(CGRect(x: 0, y: 0, width: largura, height: altura))
contexto.scaleBy(x: escala, y: escala)
pagina.draw(with: .mediaBox, to: contexto)

guard
  let imagem = contexto.makeImage(),
  let destino = CGImageDestinationCreateWithURL(
    URL(fileURLWithPath: args[4]) as CFURL, "public.png" as CFString, 1, nil)
else {
  falhar("não consegui preparar \(args[4])")
}
CGImageDestinationAddImage(destino, imagem, nil)
guard CGImageDestinationFinalize(destino) else {
  falhar("não consegui gravar \(args[4])")
}
