import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DMCAService {
 DMCA;
  constructor() {
      //Initializes DMCA as below value
    this.DMCA = `Log's Goods is an online service provider as defined in the Digital Millennium Copyright Act. We provide legal copyright owners with the ability to self-publish on the internet by uploading, storing and displaying various media utilizing our services. We do not monitor, screen or otherwise review the media which is uploaded to our servers by users of the service. We take copyright violation very seriously and will vigorously protect the rights of legal copyright owners. If you are the copyright owner of content which appears on the Log's Goods website and you did not authorize the use of the content you must notify Log's Goods in writing in order for us to identify the allegedly infringing content and take action.

In order to more easily facilitate the process we have provided a form for your use on our contact us page. We will be unable to take any action if you do not provide us with the required information so please fill out all fields accurately and completely. Alternatively you may make a written notice via email, facsimile or postal mail to the DMCA AGENT as listed below. Your written notice must include the following:

A physical or electronic signature of the copyright owner or person authorized to act on behalf of the owner which expressly claims an exclusive right that is allegedly being infringed.
Specific identification of the copyrighted work which you are alleging to have been infringed. If you are alleging infringement of multiple copyrighted works with a single notification you must submit a representative list which specifically identifies each of the works that you allege are being infringed.
Specific identification of the location and description of the material that is claimed to be infringing or to be the subject of infringing activity with enough detailed information to permit Log's Goods to locate the material. You should include the specific URL or URLs of the web pages where the allegedly infringing material is located.
Information reasonably sufficient to allow Log's Goods to contact the complaining party which may include a name, address, telephone number and electronic mail address at which the complaining party may be contacted.
A statement that the complaining party has a good faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent or the law.
A statement that the information in the notification is accurate, and under penalty of perjury that the complaining party is authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.
Please also note that under applicable law, 17 U.S.C. 512(f), any person who knowingly materially misrepresents that material or activity is infringing may be subject to liability.
Send any infringements to logan.whitla@gmail.com or report using the site.`}

getDMCA(){
    return this.DMCA; //Returns DMCA to caller
    }
setDMCA(DMCA){
    this.DMCA=DMCA; // Sets DMCA to DMCA value
  
    }
}
