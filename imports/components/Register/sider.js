import React from 'react';

class Sider extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let maxSteps = 5;
		const lastCompletedStep = (this.props.user || {}).step || 0; //this.props.params.form (querystring-wide)
    const height = (lastCompletedStep * 100) / maxSteps; //% of current step

		if(lastCompletedStep == 5) {
			return (
				<div className="div-steps-cadastro">
					<div>
						<div className="budget-cadastro activeBudget">
						</div>
						<p className="congrats"><span>Perfil completo</span>Parabéns, você completou todo seu perfil e ganhou um budget!</p>
						<div className="div-line-budget">
							<div className="line-budget hidden">
								<div className="step" style={{height:'100%'}}/>
							</div>
						</div>
					</div>
				</div>
			)
		}

    return (
      <div className="div-steps-cadastro">
        <div>
          <div className="budget-cadastro" />
          <div className="div-line-budget">
            <div className="line-budget">
              <div className="step" style={{ height: `${height}%` }} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GLOBAL.createContainer((props) => {
  const user = Meteor.user() || {};

  return {
		user
  };
}, Sider);
