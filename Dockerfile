FROM quay.io/ukhomeofficedigital/nodejs:v4.4.2


RUN npm install -g nodemon

USER nodejs

EXPOSE 8080
CMD ["npm", "start"]
