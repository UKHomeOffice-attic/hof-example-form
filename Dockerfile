FROM vaijab/nodejs:0.12.7

RUN useradd -d /app app
RUN mkdir -p /public
RUN chown app:app /public

WORKDIR /app
USER app

COPY package.json /app/package.json
COPY assets /app/assets
RUN npm install
COPY . /app

USER root
RUN chown -R app:app .

USER app
RUN npm run hof-transpile

USER root
EXPOSE 8080
CMD ./run.sh
