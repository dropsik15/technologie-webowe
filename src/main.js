import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
import { format } from 'https://cdn.jsdelivr.net/npm/date-fns/+esm';

const supabaseUrl = 'https://uzfzkguhrkinwkokhnkd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV6ZnprZ3Vocmtpbndrb2tobmtkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg4NTQ4OTgsImV4cCI6MjA2NDQzMDg5OH0.tz2Z5DNXIRQlP8HWNfTQP_fA5Fx12KZdF_GpGriBSlo';
const supabase = createClient(supabaseUrl, supabaseKey);

async function displayArticles() {
  const container = document.getElementById('articles-container');
  const sortSelect = document.getElementById('sort-select');
  const sortValue = sortSelect ? sortSelect.value : 'created_at.desc';
  const [column, direction] = sortValue.split('.');

  const { data: article } = await supabase
    .from('article')
    .select('title, subtitle, author, created_at, content')
    .order(column, { ascending: direction === 'asc' });


  let html = '';
  article.forEach((item, i) => {
    html += `<div class="article">
      <h3>Artykuł ${i + 1}</h3>
      <p>Tytuł: ${item.title}</p>
      <p>Podtytuł: ${item.subtitle}</p>
      <p>Autor: ${item.author}</p>
      <p>Data utworzenia: ${format(new Date(item.created_at), 'dd-MM-yyyy')}</p>
      <p>Treść:${item.content}</p>
    </div>`;
  });

  container.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', () => {
  displayArticles();

  const form = document.getElementById('article-form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = form.title.value;
    const subtitle = form.subtitle.value;
    const author = form.author.value;
    const content = form.content.value;
    const createdAtRaw = form.created_at.value;
    const created_at = new Date(createdAtRaw).toISOString(); 

    await supabase
      .from('article')
      .insert([{ title, subtitle, author, content, created_at }]);

    form.reset();
    displayArticles();
  });

  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', displayArticles);
  }
});