import React from 'react';
import { Link, DefaultRoute } from 'react-router';
import Dropzone from 'react-dropzone';
import classNames from 'classnames';

// Brokers Manager API for development tests
const FORM5_TEST_AREA_BROKERS_API = false;

// File input component
class FileInputDropzone extends React.Component {
  
  constructor(props) {
    // Super props
    super(props);
    
    // Set the html component
    this.state = {
      label: 'Selecionar arquivo',
      fileId: null,
      socialBoxInformation: this.props.input || false,
      output: this.props.output || false
    };
    
    // Bind the functions
  }
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.output || nextProps.input) {
      this.setState({
        output: nextProps.output,
				socialBoxInformation: nextProps.input
      });
    }
  }
  
  onDrop(acceptedFiles, rejectedFiles) {
  	const { socialBoxInformation } = this.state;

  	if(rejectedFiles.length) {
			return swal('', `Arquivo com formatação incorreta. (${(rejectedFiles || []).map(f => f.name).join(", ")})`, 'error');
		}
    
    // Check for the file receveid in the client side
    if (acceptedFiles != null) {
      // File receveid in client side is ok
      console.log(`Filename to upload: ${acceptedFiles[0].name}`);
      
      // Create file to upload
      const uploadFile = new FS.File(acceptedFiles[0]);
      uploadFile.creatorId = '1366189566747952';
      
      // Upload the file to server
      Uploads.insert(uploadFile, (err, fileObj) => {
        // check for the response of upload status
        if (err) {
					// Erro in file upload
					console.log('Error in upload: ', err);
        } else {
          // Flush with name of the file in the label and set file id of upload
					socialBoxInformation.uploadIsDone = false; //Secure reset input
          this.setState({
						socialBoxInformation,
            label: fileObj.name(),
            fileId: fileObj._id
          });
          
          // Call callback to set file id in external state
					return this.state.output(this.state.socialBoxInformation.socialCode, fileObj._id);
        }
      });
    }
  }
  
  render() {
  	const { socialBoxInformation, label } = this.state;

  	// Check Loading TODO: Loading Progression each request
		let isLoading = !!(socialBoxInformation.uploadFileId);

  	// Check if upload is done or not
    let isUploadDone = (socialBoxInformation.uploadIsDone == true);

		// Check if is Lock or unlock box
    let isDisabled = !socialBoxInformation.inputEnable;

    // Dynamic social button class name
    let socialClass = `btn-${socialBoxInformation.nameInCSS}`

    const btnClass = classNames({
    	'btn btn-upload': true,
			[socialClass]: true,
			'btn-file': true,
			'upload-secundario': true,
			'disabled': isDisabled,
			'completo': isUploadDone,
			'carregando': isLoading
		});

    // Return the html component
    return (
      <div className="col-md-4">
        <div className="upload-line">
          <Dropzone
						onDrop={this.onDrop.bind(this)}
						style={{ borderStyle: '' }}
						multiple={false}
						accept={(socialBoxInformation.accept || '')}
						disableClick={isDisabled}
					>
          <span className={btnClass}>
            <div className="upload-progress" />
            {isUploadDone && <i className="fa fa-check" />}
            <span className={`upload-line-name ${isUploadDone && 'hidden'}`}
									style={{ display: 'inline-block' }}>
							{label}
						</span>
            <div className="icon-btn">
              <i className={`fa fa-${socialBoxInformation.nameInCSS}`} aria-hidden="true" />
            </div>
          </span>
					</Dropzone>
        </div>
      </div>
    );
  }
}

// Form5 component
class Form5 extends React.Component {
  
  constructor(props) {
    // Super props
    super(props);

    // Set states
    this.state = {
      step: 5,
      totalSteps: 5,
      previousStep: '/register/4',
      nextStep: GLOBAL.DASHBOARD_ROUTE,
      uploadStatus: '',
      uploads: [
        {
          name: 'facebook',
          socialName: 'facebook',
          socialCode: 'face',
          inputEnable: true,
          nameInCSS: 'facebook',
          uploadFileId: null,
          uploadIsDone: false,
					accept: [
						'text/html'
					].join(',')
        },
				{
					name: 'excel',
					socialName: 'file-excel-o',
					socialCode: 'excl',
					inputEnable: true,
					nameInCSS: 'file-excel-o',
					uploadFileId: null,
					uploadIsDone: false,
					accept: [
						'application/vnd.ms-excel',
						'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
						'application/excel'
					].join(',')
				},
        {
          name: 'linkedin',
          socialName: 'linkedin',
          socialCode: 'link',
          inputEnable: false,
          nameInCSS: 'linkedin',
          uploadFileId: null,
          uploadIsDone: false,
        },
        {
          name: 'googleplus',
          socialName: 'google-plus',
          socialCode: 'goog',
          inputEnable: false,
          nameInCSS: 'google-plus',
          uploadFileId: null,
          uploadIsDone: false,
        },
        {
          name: 'skype',
          socialName: 'skype',
          socialCode: 'skyp',
          inputEnable: false,
          nameInCSS: 'skype',
          uploadFileId: null,
          uploadIsDone: false,
        },
        {
          name: 'cloud',
          socialName: 'cloud',
          socialCode: 'clou',
          inputEnable: false,
          nameInCSS: 'cloud',
          uploadFileId: null,
          uploadIsDone: false,
        }
      ],
    };
    
    // Bind the functions
    this._callbackInputUploadBox = this._callbackInputUploadBox.bind(this);
    this._renderInputUploadBox = this._renderInputUploadBox.bind(this);
    this._renderBasesToUploadButtons = this._renderBasesToUploadButtons.bind(this);
  }
  
  _callbackInputUploadBox(socialCode, fileId) {
    if (fileId != undefined) {
      const uploadInfo = this.state.uploads.find(upload => (upload.socialCode == socialCode));
      if (uploadInfo != undefined) {
        uploadInfo.uploadFileId = fileId;
        this.setState({
          ...this.state.uploads,
          uploadInfo,
          uploadStatus: 'ready',
        });
      }
    }
  }
  
  _renderInputUploadBox(upload) {
    if (upload != undefined) {
      return (
        <FileInputDropzone
					key={upload.name}
					input={upload}
					output={(socialCode, fileId) => (this._callbackInputUploadBox(socialCode, fileId))}
				/>
      );
    }
  }
  
  _renderBrokersManagerAPITests() {
    if (FORM5_TEST_AREA_BROKERS_API == true) {
      const _brokerId = '1366189566747952';
      const _brokerName = 'Mohamad Jameh';
      let _social;
      let _fileId;
      return (
        <div className="Ramires-Test">
          <div className="Ramires-Test-Import">
            <FileInputDropzone context={function (socialCode, fileId) {
                _social = socialCode;
                _fileId = fileId;
              }
            }/>
            <button id="btnHandleSubmit" type="button" className="btn-md-lg finalizar-dash principal"
                    onClick={() => Meteor.call('brokerscontacts.services.importCustomers', _brokerId, _brokerName, _social, _fileId)}>
              Upload the file and generate Customers Collection
            </button>
          </div>
          <div><p /></div>
          <div><p /></div>
          <div className="Ramires-Test-Driver">
            <button id="btnHandleSubmit" type="button" className="btn-md-lg finalizar-dash principal"
                    onClick={() => Meteor.call('brokerscontacts.connector.brokers')}>
              brokerscontacts.brokers
            </button>
            <button id="btnHandleSubmit" type="button" className="btn-md-lg finalizar-dash principal"
                    onClick={() => Meteor.call('brokerscontacts.connector.createbroker', _brokerId, _brokerName)}>
              brokerscontacts.createbroker
            </button>
            <button id="btnHandleSubmit" type="button" className="btn-md-lg finalizar-dash principal"
                    onClick={() => Meteor.call('brokerscontacts.connector.contacts', _brokerId)}>
              brokerscontacts.contacts
            </button>
            <button id="btnHandleSubmit" type="button" className="btn-md-lg finalizar-dash principal"
                    onClick={() => Meteor.call('brokerscontacts.connector.loadcontacts', _brokerId)}>
              brokerscontacts.loadcontacts
            </button>
            <button id="btnHandleSubmit" type="button" className="btn-md-lg finalizar-dash principal"
                    onClick={() => Meteor.call('brokerscontacts.connector.savecontacts', _brokerId)}>
              brokerscontacts.savecontacts
            </button>
          </div>
          <div><p /></div>
          <div><p /></div>
        </div>
      );
    }
  }
  
  _onClickBasesToUploadButtons(event) {
		const totalBaseToUpload = (this.state.uploads.filter(u => !!u.uploadFileId) || []).length;
		const totalBaseUploaded = (this.state.uploads.filter(u => u.uploadIsDone) || []).length;
		this.setState({
			uploadStatus: 'loading',
		});

    for (let indexPosition = 0; indexPosition < this.state.uploads.length; indexPosition++) {
			const brokerId = (this.props.facebookProfile).id;
			const brokerName = (this.props.facebookProfile).name;
			const socialInformations = this.state.uploads[indexPosition];

      if (socialInformations.uploadFileId != null) {
        const socialCode = socialInformations.socialCode;
        const uploadId = socialInformations.uploadFileId;

        //TEST WITHOUT API RESPONSE
        // socialInformations.uploadIsDone = true;
        // this.setState({
					// ...this.state.uploads,
					// socialInformations,
					// uploadStatus: 'ready',
        // });

        Meteor.call('brokerscontacts.services.importCustomers', brokerId, brokerName, socialCode, uploadId,
          (error, result) => {
            if (error) {
              sweetAlert('Erro de sistema', `Descrição do erro: ${error}`, 'error');
              return this.setState({uploadStatus: 'ready'});
            } else if (result.status == false) {
              sweetAlert('Erro de sistema', `Erro apresentando em: ${result.errorFunction}`, 'error');
              return this.setState({uploadStatus: 'ready'});
            } else {
            	if(totalBaseToUpload > 0 && (totalBaseUploaded + 1) >= totalBaseToUpload)
								swal('', `Upload Concluído`, 'success');

            	socialInformations.uploadIsDone = true;
							this.setState({
								...this.state.uploads,
								socialInformations,
								uploadStatus: 'ready',
							});
            }
          },
        );
      }
    }
  }

  _renderBasesToUploadButtons() {
    let uploadButton;
    switch (this.state.uploadStatus) {
      case ('ready'):
        uploadButton = (
          <button ref="btnUparBases" type="button" className="btn btn-uparbases"
                  onClick={this._onClickBasesToUploadButtons.bind(this)}>
            <i className="fa fa-upload" /> Upar bases
          </button>
        );
        break;
      case ('loading'):
        uploadButton = (
          <button ref="btnCarregandoBases" type="button" disabled className="btn disabled btn-carregando">
            <i className="fa fa-upload" /> Carregando...
          </button>
        );
        break;
      default:
        uploadButton = (
          <button ref="btnCarregandoBases" type="button" disabled className="hidden disabled btn btn-carregando">
            <i className="fa fa-upload" aria-hidden="true" /> Waiting
          </button>
        );
    }
    return uploadButton;
  }
  
  render() {
    const userPic = `https://graph.facebook.com/${(this.props.facebookProfile).id}/picture?type=large`;
		const totalBaseToUpload = (this.state.uploads.filter(u => !!u.uploadFileId) || []).length;
		const totalBaseUploaded = (this.state.uploads.filter(u => u.uploadIsDone) || []).length;
		const isUploadDone = (totalBaseToUpload > 0 && totalBaseToUpload == totalBaseUploaded);

    return (
      <div className="step5 div-form-cadastro">
        <div className="container-fluid">
          <div className="header-form col-md-12">
            <div className="photo-cadastro" style={{ background: `url(${userPic})` }} />
            <div>
              <span>Etapa {this.state.step}/{this.state.totalSteps}</span>
              <h1 className="cadastro-titulo">Upload de bases</h1>
            </div>
          </div>
          <div className="content-form col-md-12">
            <div className="form-group">
              <div className="contenedor-formulario">
                <div className="formulario">
                  <div className="row">
                    <div className="div-upload">
                      <div className="col-md-12">
												{this.state.uploads.map(u => this._renderInputUploadBox(u))}
                        <div className="col-md-12">
                          <div className="upload-info">
														{totalBaseToUpload > 0 && <p>{totalBaseToUpload} base(s) a ser carregada(s)</p>}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12 div-infos-upload">
                      <p className={`info-upload ${totalBaseToUpload > 0 && 'hidden'}`}>
												Selecione os arquivos para upload
											</p>
                      <div className="col-md-12 div-infos-upload">
												{isUploadDone ? 'Upload Concluído': this._renderBasesToUploadButtons()}
                      </div>
                    </div>
                  </div>
                  <div className="row footer-form">
                    <div className="col-md-12 text-right">
                      <Link id="previousStep" className="pull-left" to={this.state.previousStep}>
                        <button type="button" className="pull-left btn-md-lg">
                          Voltar
                        </button>
                      </Link>
											{isUploadDone &&
											<Link id="nextStep" className="pull-right" to={this.state.nextStep}>
												<button id="btnHandleSubmit" type="button" className="pull-right btn-md-lg finalizar-dash principal">
													Finalizar
												</button>
                      </Link>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {this._renderBrokersManagerAPITests()}
        </div>
      </div>
    );
  }
}

// Form5 Container
export default GLOBAL.createContainer(() => {
  // Subscribe the collections
  const subUser = Meteor.subscribe('user.selfProfile');
  const uploads = Meteor.subscribe('Uploads');
  
  // Return the container
  return {
    user: (Meteor.user() || {}),
    facebookProfile: (((Meteor.user() || {}).services || {}).facebook) || {},
    loading: !subUser.ready(),
    uploads,
  };
}, Form5);

