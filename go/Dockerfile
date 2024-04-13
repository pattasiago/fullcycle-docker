FROM golang:alpine3.19 as build

RUN mkdir /go/hello
WORKDIR /go/hello
RUN go mod init example/hello
COPY main.go .
RUN go build .

FROM scratch
COPY --from=build /go/hello/hello /bin/hello
CMD ["/bin/hello"]
