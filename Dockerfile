FROM ubuntu
RUN  apt update
RUN  apt install curl -y
RUN  curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
RUN  apt install unzip
RUN  unzip awscliv2.zip
RUN  ./aws/install 
RUN  mkdir -p /usr/local/lib/nodejs
RUN  curl https://nodejs.org/dist/v18.12.1/node-v18.12.1-linux-x64.tar.xz --output node-v18.12.1-linux-x64.tar.xz
RUN  apt install xz-utils
RUN  tar -xJvf ./node-v18.12.1-linux-x64.tar.xz -C /usr/local/lib/nodejs
RUN  echo "export PATH=/usr/local/lib/nodejs/node-v18.12.1-linux-x64/bin:$PATH" >> ~/.bashrc 
CMD ["bash"]
