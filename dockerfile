FROM jekyll/jekyll:4.2.0

WORKDIR /srv/jekyll

COPY Gemfile* ./
RUN bundle install

COPY . .

EXPOSE 4000

CMD ["jekyll", "serve", "--livereload", "--force_polling", "--host", "0.0.0.0"]