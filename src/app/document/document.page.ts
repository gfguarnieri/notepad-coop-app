import { Component } from '@angular/core';
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'app-document',
  templateUrl: './document.page.html',
  styleUrls: ['./document.page.scss'],
})
export class DocumentPage{


  public title: string = "";

  public paragraphs: string[] = ['']
  private styles: string[] = ["p", "h1"]
  private textAreasElements: NodeListOf<HTMLTextAreaElement>;
  private currentTextArea: HTMLTextAreaElement;
  public currentElement: number = 0;

  constructor(private renderer: Renderer2) {

  }

  trackByIdx(index: number, obj: any): any {
    return index;
  }

  textareaPress(ev: KeyboardEvent, posicao: number) {
    this.changeCurrentElement(posicao)
    const activeElement = document.activeElement;

    if (activeElement.tagName === "TEXTAREA") {
      this.currentElement = parseInt(activeElement.getAttribute("id").split("-")[2])
    }

    const target = (ev?.target as HTMLInputElement);
    console.log(ev.code, this.currentElement)

    if (ev.code === "Enter") {
      ev.preventDefault();
      let textPartial = this.currentTextArea.value.substring(this.currentTextArea.selectionStart, this.currentTextArea.value.length)
      let textInitial = this.currentTextArea.value.substring(0, this.currentTextArea.selectionStart)
      this.paragraphs[posicao] = textInitial;
      this.paragraphs.splice(posicao + 1, 0, textPartial);

      setTimeout(() => {
        this.changeCurrentElement(posicao + 1);
        const textareas = this.textAreasElements;
        const lastTextarea = textareas[posicao + 1] as HTMLTextAreaElement;
        lastTextarea.selectionStart = 0;
        lastTextarea.selectionEnd = 0;
        if (lastTextarea) {
          this.changeCurrentElement(posicao + 1)
          lastTextarea.focus();
        }
      }, 100);
    }

    if (ev.code === "Backspace"
      && target.value === ""
      && this.paragraphs.length > 1
      && this.currentElement !== 0) {
      ev.preventDefault();
      const textareas = this.textAreasElements;
      const lastTextarea = textareas[posicao - 1] as HTMLTextAreaElement;
      this.paragraphs.splice(posicao, 1)
      this.changeCurrentElement(posicao - 1)
      lastTextarea.focus();
      lastTextarea.setSelectionRange(lastTextarea.value.length, lastTextarea.value.length);
    }

    if (ev.code === "Backspace"
      && target.value !== ""
      && this.paragraphs.length > 1
      && this.currentElement !== 0
      && this.currentTextArea.selectionStart === 0
      && this.currentTextArea.selectionEnd === 0) {

      ev.preventDefault();
      const textareas = this.textAreasElements;
      const lastTextarea = textareas[posicao - 1] as HTMLTextAreaElement;
      const lengthParagraph = this.paragraphs[posicao].length;
      this.paragraphs[posicao - 1] += this.paragraphs[posicao]
      this.paragraphs.splice(posicao, 1)
      this.changeCurrentElement(posicao - 1)
      lastTextarea.focus();

      setTimeout(() => {
        lastTextarea.selectionStart = lastTextarea.value.length - lengthParagraph;
        lastTextarea.selectionEnd = lastTextarea.value.length - lengthParagraph;
      }, 0)

    }

    if (ev.code === "ArrowDown"
      && this.currentElement < (this.paragraphs.length - 1)
      && this.currentTextArea.selectionStart == this.currentTextArea.selectionEnd
      && this.currentTextArea.selectionEnd == this.currentTextArea.textLength
    ) {
      this.changeCurrentElement(posicao + 1);
      setTimeout(() => {
        console.log(this.currentElement)
        this.textAreasElements[this.currentElement].focus();
        this.textAreasElements[this.currentElement].selectionStart = 0;
        this.textAreasElements[this.currentElement].selectionStart = 0;
      }, 0);
    }

    if (ev.code === "ArrowUp"
      && this.currentElement > 0
      && this.currentTextArea.selectionStart == 0
      && this.currentTextArea.selectionEnd == 0
    ) {
      this.changeCurrentElement(posicao - 1);
      setTimeout(() => {
        this.textAreasElements[this.currentElement].focus();
        this.textAreasElements[this.currentElement].selectionStart = this.textAreasElements[this.currentElement].textLength;
        this.textAreasElements[this.currentElement].selectionStart = this.textAreasElements[this.currentElement].textLength;
      }, 0);
    }

  }

  setTo(c: string) {
    const textarea = document.querySelector('textarea:focus') as HTMLElement;
    textarea.classList.remove(...this.styles);
    textarea.classList.add(c)
  }

  changeCurrentElement(position: number) {
    this.currentElement = position;
    this.textAreasElements = document.querySelectorAll('textarea') as NodeListOf<HTMLTextAreaElement>;
    this.currentTextArea = this.textAreasElements[position];
  }

}
