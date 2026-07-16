import React from 'react';
import './CentralReactor.css';

const CentralReactor = () => {
  return (
    <div className="central-reactor">
      {/* Top machinery */}
      <div className="reactor-cap top">
        <div className="reactor-ring outer"></div>
        <div className="reactor-ring inner"></div>
      </div>

      {/* The Core */}
      <div className="reactor-core">
        {/* Intersecting panes to create a volumetric 3D glowing core without flat paper effect */}
        <div className="core-pane pane-1">
          <div className="dna-strand"></div>
        </div>
        <div className="core-pane pane-2">
          <div className="dna-strand"></div>
        </div>
        <div className="core-pane pane-3">
          <div className="dna-strand"></div>
        </div>
        
        {/* Outer glass cylinder illusion */}
        <div className="core-glass"></div>
      </div>

      {/* Bottom machinery */}
      <div className="reactor-cap bottom">
        <div className="reactor-ring inner"></div>
        <div className="reactor-ring outer"></div>
      </div>
    </div>
  );
};

export default CentralReactor;
