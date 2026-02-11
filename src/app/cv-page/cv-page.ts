
import { CommonModule } from '@angular/common';
import { Component, input, signal } from '@angular/core';

interface Bullet { id: string; text: string; }
interface Role { id: string; role: string; date: string; bullets: Bullet[]; }
interface Company { id: string; name: string; roles: Role[]; }
interface Section { id: string; title: string; companies: Company[]; }

@Component({
  selector: 'app-cv-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cv-page.html',
})
export class CvPage {
  isEditMode = input<boolean>(true);
  accentColor = input<string>('#3b82f6');

  private genId = () => Math.random().toString(36).substring(2, 9);

  profileImage = signal<string | null>(null);
  contactTitle = signal('Contact');

  sections = signal<Section[]>([
    {
      id: this.genId(),
      title: 'Experience',
      companies: [{
        id: this.genId(),
        name: 'Global Tech Corp',
        roles: [{
          id: this.genId(),
          role: 'Lead Architect',
          date: '2024 - Present',
          bullets: [{ id: this.genId(), text: 'Strategic direction of the CV Engine.' }]
        }]
      }]
    }
  ]);

  // FIX: Separate Company, Role, and Bullet Logic
  addCompany(secId: string) {
    this.sections.update(s => s.map(sec => sec.id === secId ? 
      { ...sec, companies: [...sec.companies, { id: this.genId(), name: 'New Company', roles: [] }] } : sec));
  }

  addRole(secId: string, comId: string) {
    this.sections.update(s => s.map(sec => sec.id === secId ? {
      ...sec, companies: sec.companies.map(com => com.id === comId ? 
        { ...com, roles: [...com.roles, { id: this.genId(), role: 'New Role', date: 'DATE', bullets: [] }] } : com)
    } : sec));
  }

  addBullet(secId: string, comId: string, roleId: string) {
    this.sections.update(s => s.map(sec => sec.id === secId ? {
      ...sec, companies: sec.companies.map(com => com.id === comId ? {
        ...com, roles: com.roles.map(r => r.id === roleId ? 
          { ...r, bullets: [...r.bullets, { id: this.genId(), text: 'New achievement' }] } : r)
      } : com)
    } : sec));
  }

  onInput(obj: any, key: string, event: Event) {
    obj[key] = (event.target as HTMLElement).innerText;
  }

  handleImage(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => this.profileImage.set(reader.result as string);
      reader.readAsDataURL(file);
    }
  }
}